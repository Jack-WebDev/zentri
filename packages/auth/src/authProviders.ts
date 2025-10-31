import type { ComponentProps, ElementType } from "react";
import { DiscordIcon, GitHubIcon, GoogleIcon } from "./utils/icons";

export const SUPPORTED_AUTH_PROVIDERS = ["github", "discord", "google"];
export type AuthProvider = (typeof SUPPORTED_AUTH_PROVIDERS)[number];

export const SUPPORTED_AUTH_PROVIDER_DETAILS: Record<
  AuthProvider,
  {
    name: string;
    Icon: ElementType<ComponentProps<"svg">>;
  }
> = {
  discord: {
    name: "Discord",
    Icon: DiscordIcon,
  },
  google: {
    name: "Google",
    Icon: GoogleIcon,
  },
  github: {
    name: "GitHub",
    Icon: GitHubIcon,
  },
};
