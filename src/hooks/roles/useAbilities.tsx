import { useEffect, useState } from "react";
import { AppAbility, defineAbilitiesFor } from "./defineAbilities";

export function useAbilities(roles: string[]): AppAbility {
  const [ability, setAbility] = useState<AppAbility>(defineAbilitiesFor([]));

  useEffect(() => {
    setAbility(defineAbilitiesFor(roles));
  }, [roles]);

  return ability;
}
