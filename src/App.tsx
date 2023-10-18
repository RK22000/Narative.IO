import { Button } from "@/components/ui/button";
import { Checkbox } from "./components/ui/checkbox";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./components/ui/accordion";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const numbers = useQuery(api.myFunctions.listNumbers, { count: 10 });
  const addNumber = useMutation(api.myFunctions.addNumber);

  return (
    <main className="container max-w-2xl flex flex-col gap-8">
      <h1 className="text-4xl font-extrabold my-8 text-center">
        Get Hacking with Convex
      </h1>
      {/* <p>
        Click the button and open this page in another window - this data is
        persisted in the Convex cloud database!
      </p>
      <p>
        <Button
          onClick={() => {
            void addNumber({ value: Math.floor(Math.random() * 10) });
          }}
        >
          Add a random number
        </Button>
      </p>
      <p>
        Numbers:{" "}
        {numbers?.length === 0
          ? "Click the button!"
          : numbers?.join(", ") ?? "..."}
      </p> */}
      <Accordion type="multiple">
        <AccordionItem value="dashboard">
          <AccordionTrigger>
            <Checkbox id="dashboard" />
            <label htmlFor="dashboard">Use the Convex Dashboard</label>
          </AccordionTrigger>
          <AccordionContent>
            Visit{" "}
            <a
              className="font-medium text-primary underline underline-offset-4"
              target="_blank"
              href="https://dashboard.convex.dev/"
            >
              dashboard.convex.dev
            </a>{" "}
            to view & edit your project and data
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <p>
        Edit{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          convex/myFunctions.ts
        </code>{" "}
        to change your backend
      </p>
      <p>
        Edit{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          src/App.tsx
        </code>{" "}
        to change your frontend
      </p>
      <p>
        Check out the{" "}
        <a
          className="font-medium text-primary underline underline-offset-4"
          target="_blank"
          href="https://docs.convex.dev/home"
        >
          Convex docs
        </a>{" "}
        to learn more
      </p>
    </main>
  );
}

export default App;