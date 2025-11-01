import {
  SUPPORTED_AUTH_PROVIDER_DETAILS,
  SUPPORTED_AUTH_PROVIDERS,
} from "@zentri/auth/client";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";

export default function SocialButtons() {
  return (
    <div className="my-6 flex justify-center gap-2">
      {SUPPORTED_AUTH_PROVIDERS.map((provider) => {
        const { Icon, name } = SUPPORTED_AUTH_PROVIDER_DETAILS[provider];
        return (
          <Button
            key={provider}
            variant="outline"
            type="button"
            onClick={() =>
              authClient.signIn.social({
                provider,
                callbackURL: "http://localhost:3001/home",
              })
            }
          >
            <Icon />
            <span>{name}</span>
          </Button>
        );
      })}
    </div>
  );
}
