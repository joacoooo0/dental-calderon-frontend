import { Button } from "@/components/ui/button";

export function ButtonSecondary(props: { name: string; icono: string }) {
  return (
    <Button className="font-normal">
      <img src={props.icono} alt="" className="w-4 h-4 invert" />
      {props.name}
    </Button>
  );
}
