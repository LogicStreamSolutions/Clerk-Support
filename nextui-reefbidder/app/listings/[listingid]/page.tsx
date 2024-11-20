"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import { Image } from "@nextui-org/image";
import { User } from "@nextui-org/user";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import { HeartIcon } from "../../../public/hearticon";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link} from "@nextui-org/react";



const ListingPage: React.FC = () => {
    const { listingid } = useParams();
    const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
    const [liked, setLiked] = useState(false); // New state for heart icon
    const [currentBid, setCurrentBid] = useState(30);
    const [suggestedBid, setSuggestedBid] = useState(currentBid + 2);

    useEffect(() => {
        if (timeRemaining <= 0) return;

        const intervalId = setInterval(() => {
            setTimeRemaining((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeRemaining]);

    // Update suggestedBid whenever currentBid changes
    useEffect(() => {
        setSuggestedBid(currentBid + 2);
    }, [currentBid]);

    // Convert seconds to minutes and seconds format
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    // Handler to toggle the liked state
    const toggleLike = () => setLiked((prevLiked) => !prevLiked);

  return (
    <div style={{ textAlign: "center", maxWidth: "3000px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          alignItems: "flex-start",
          justifyContent: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        {/* Image Section */}
        <div style={{ flex: "1 1 300px", maxWidth: "600px", position: "relative" }}>
          <Image
            alt="NextUI hero Image"
            src="https://www.discountcoral.com/cdn/shop/products/Alveopora-coral-frags.jpg?v=1622055902"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
            }}
          />
        </div>
  
        {/* Info Section */}
        <div style={{ flex: "1 1 300px", maxWidth: "500px", display: "flex", flexDirection: "column", gap: "1rem" }}>
          

          
          <Card>
          <CardHeader className="flex flex-col gap-2" style={{ justifyContent: "center", alignItems: "flex-start" }}>
    <div style={{ fontSize: "1.3rem", textAlign: "left" }}>
        Alveopora Coral Frag
    </div>
    <div className="flex justify-between items-center w-full">
        <p style={{ fontSize: "1rem", textAlign: "left", margin: 0 }}>
            Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
        <Button 
            color={liked ? "danger" : "default"} 
            aria-label="Like"
            variant="solid"
            onClick={toggleLike} 
            size="sm"
            startContent={<HeartIcon filled={liked} size={24} height={undefined} width={undefined} label={undefined} />}
        >
            Watchlist
        </Button>
    </div>
</CardHeader>


            <Divider/>
            <CardBody>
            <p style={{ fontSize: "1rem" }}>
            Current Bid: ${currentBid}
            </p>
              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", alignItems: "center" }}>  
                <Input
                  type="number"
                  label="Your Bid"
                  placeholder={suggestedBid.toString()}
                  labelPlacement="outside"
                  endContent={<span className="text-default-400 text-small">$</span>}
                  style={{ flex: "1" }}
                  size="lg"
                />
                <ButtonGroup style={{ alignSelf: "flex-end" }}>
                  <Button>Place Bid</Button>
                </ButtonGroup>
              </div>
            </CardBody>
            <Divider/>
            <CardFooter className="flex justify-between items-start">
                <div className="flex flex-col">
                    <User
                        as="button"
                        avatarProps={{
                            isBordered: true,
                            radius: "sm",
                            color: "warning",
                            src: "/avatar1.png",
                            size: "md",
                        }}
                        description="View Seller"
                        name="Hillgoff Farms"
                    />
                    <p style={{ fontSize: "1rem", margin: 0, marginTop: "12px", color: "#777" }}>
                        4.5 Stars | 58 Sales
                    </p>
                </div>
                
                <div style={{ textAlign: "right", color: "#777" }}>
                    <p style={{ fontSize: "1rem", margin: 0 }}>
                        Listing ID: {listingid}
                    </p>
                    <p style={{ fontSize: "1rem", margin: 0 }}>
                        Watching: 5
                    </p>
                    <p style={{ fontSize: "1rem", margin: 0 }}>
                        Viewed: 10
                    </p>
                </div>
            </CardFooter>

          </Card>
        </div>
      </div>
  
      {/* Additional Sections */}
      
      <div style={{ marginTop: "2rem" }}>
      <Card>
        <CardHeader>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Seller Information & Shipping Options</h2>
        </CardHeader>
        <CardBody>
        <p style={{ fontSize: "1.2rem" }}>Seller Information & Shipping Options information can go here.</p>
        </CardBody>
        </Card>
      </div>
        

  
      <div style={{ marginTop: "2rem" }}>
        <Card>
        <CardHeader>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Bidding History</h2>
        </CardHeader>
        <CardBody>
        <Table aria-label="Example empty table">
          <TableHeader>
            <TableColumn>User</TableColumn>
            <TableColumn>Bid</TableColumn>
            <TableColumn>Status</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        </Table>
        </CardBody>
        </Card>
      </div>

      <div style={{ marginTop: "2rem" }}>
      <Card>
        <CardHeader>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Sellers Other Items</h2>
        </CardHeader>
        <CardBody>
        <p style={{ fontSize: "1.2rem" }}>Other items this seller has for sale/auction.</p>
        </CardBody>
        </Card>
      </div>

      <div style={{ marginTop: "2rem" }}>
      <Card>
        <CardHeader>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Similar Listings</h2>
        </CardHeader>
        <CardBody>
        <p style={{ fontSize: "1.2rem" }}>Sales/Auctions with similar items.</p>
        </CardBody>
        </Card>
      </div>
    </div>
  );
  
};

export default ListingPage;
