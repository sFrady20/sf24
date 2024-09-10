import { MultilineInput } from "@/components/multiline-input";
import { Button } from "@/components/ui/button";
import { AppNameGenerationForm } from "./components";

export default async function () {
  return (
    <div className="py-[100px] md:pt-[132px] container">
      <AppNameGenerationForm className="flex flex-row items-center gap-2">
        <MultilineInput />
        <Button variant={"outline"}>Prompt</Button>
      </AppNameGenerationForm>
    </div>
  );
}
