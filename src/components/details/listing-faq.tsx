import { Faq } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
  faq: Faq[];
};

function ListingFAQ({ faq }: Props) {
  return (
    <>
      <Accordion type="single" collapsible className="max-w-2xl mx-auto">
        {faq.map((item, i) => (
          <AccordionItem value={i.toString()} key={i}>
            <AccordionTrigger className="justify-center gap-4 text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-center">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default ListingFAQ;
