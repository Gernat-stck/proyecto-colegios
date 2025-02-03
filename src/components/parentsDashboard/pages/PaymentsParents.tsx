import FallingText from "@/components/ui/FallingText";

export default function PaymentsParents() {
  return (
    <div className="min-h-[90vh] w-full flex justify-center items-center p-4">
      <FallingText
        text={`Oops estamos trabajando para brindarte un servicio de calidad, intentalo mas tarde.`}
        highlightWords={["Oops", "para", "servicio", "calidad", "intentalo", "tarde"]}
        trigger="hover"
        backgroundColor="transparent"
        wireframes={false}
        gravity={0.26}
        fontSize="2rem"
        mouseConstraintStiffness={1.9}
      />
    </div>
  );
}
