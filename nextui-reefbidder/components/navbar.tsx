"use client";

import { useState, useEffect } from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/dropdown";
import { User } from "@nextui-org/user";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon, Logo } from "@/components/icons";

// Import the `useUser` hook from Clerk for client-side auth check
import { useUser, SignOutButton } from "@clerk/nextjs";

export const Navbar: React.FC = () => {
  // Using Clerk's useUser hook to check if the user is logged in
  const { user, isLoaded, isSignedIn } = useUser();  // This hook provides auth info

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  // Handle loading state while `useUser` is fetching user data
  if (!isLoaded) {
    return <div>Loading...</div>;  // Optionally, display a loading spinner or message
  }

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ReefBidder</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
        {!isSignedIn ? (
          <>
            <Link
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href="/sign-up"
              size="lg"
            >
              Sign Up
            </Link>
            <p>|</p>
            <Link
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href="/sign-in"
              size="lg"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center gap-4">
              <Dropdown backdrop="blur" placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      color: "primary",
                      src: "/avatar1.png", // Use Clerk's user profile image if available
                    }}
                    className="transition-transform"
                    description="Buyer View"
                    name={user.firstName || "User"} // Use Clerk's user first name
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="faded" >
                  <DropdownItem key="settings">My Account</DropdownItem>
                  <DropdownItem key="messages">Messages</DropdownItem>
                  <DropdownItem key="my_purchases">Purchases</DropdownItem>
                  <DropdownItem key="watchlist">Watchlist</DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    <SignOutButton />
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </>
        )}
        <ThemeSwitch />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              
              {!isSignedIn ? (
          <>
            <Link
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href="/sign-up"
              size="lg"
            >
              Sign Up
            </Link>
            <Link
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href="/sign-in"
              size="lg"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <Link
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium",
              )}
              color="foreground"
              href="/"
              size="lg"
            >
              Home
            </Link>
          </>
        )}
            </NavbarMenuItem>
            
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
