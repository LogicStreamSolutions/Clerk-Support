"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { completeOnboarding } from "./_actions";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function UserOnboardingPage() {
    const router = useRouter(); // Moved here
    const { user } = useUser(); // Moved here
    const [error, setError] = useState(""); // Moved here
    
    const [formData, setFormData] = useState<{
        firstName: string;
        lastName: string;
        streetAddress: string;
        streetAddress2: string;
        city: string;
        state: string;
        zipCode: string;
        phoneNumber: string;
        country: string;
    }>({
        firstName: "",
        lastName: "",
        streetAddress: "",
        streetAddress2: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        country: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formDataToSubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSubmit.append(key, value);
        });

        const res = await completeOnboarding(formDataToSubmit);

        if (res?.message) {
            // Reloads the user's data from the Clerk API
            await user?.reload();
            router.push("/");
        }

        if (res?.error) {
            setError(res?.error);
        }

        try {
            const response = await fetch("/api/addUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            console.log("Form data being sent:", formData);

            if (response.ok) {
                console.log("User added successfully!");
            } else {
                const errorText = await response.text(); // Capture the server error message
                console.error(`Failed to add user. Status: ${response.status}, Message: ${errorText}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="flex justify-center items-start min-h-screen p-8">
            <div className="flex gap-12 max-w-5xl w-full">
                <div className="w-1/4">
                    <div className="sticky top-8">
                        <h2 className="text-lg font-semibold mb-4">Progress</h2>
                        <ul className="space-y-2 text-gray-600">
                            <li className="font-bold text-blue-600">Step 1: Personal Info</li>
                            <li>Step 2: Address Details</li>
                            <li>Step 3: Contact Info</li>
                            <li>Step 4: Review & Submit</li>
                        </ul>
                    </div>
                </div>
                <div className="w-3/4 flex flex-col gap-4 p-8 shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-6">User Onboarding Page</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="flex gap-4">
                            <Input name="firstName" label="First Name" placeholder="John" value={formData.firstName} onChange={handleChange} className="w-full" />
                            <Input name="lastName" label="Last Name" placeholder="Doe" value={formData.lastName} onChange={handleChange} className="w-full" />
                        </div>
                        <Input name="streetAddress" label="Shipping Address" placeholder="Your Street Address" value={formData.streetAddress} onChange={handleChange} />
                        <Input name="streetAddress2" label="Shipping Address 2" placeholder="Suite 123" value={formData.streetAddress2} onChange={handleChange} />
                        <Input name="city" label="City" placeholder="New York" value={formData.city} onChange={handleChange} />
                        <div className="flex gap-4">
                            <Input name="state" label="State" placeholder="NY" value={formData.state} onChange={handleChange} className="w-full" />
                            <Input name="zipCode" label="Zip Code" placeholder="10001" value={formData.zipCode} onChange={handleChange} className="w-full" />
                        </div>
                        <Input name="country" label="Country" placeholder="United States" value={formData.country} onChange={handleChange} />
                        <Input name="phoneNumber" label="Phone Number" placeholder="123-456-7890" value={formData.phoneNumber} onChange={handleChange} />
                        <Button className="mt-6" color="primary" type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
