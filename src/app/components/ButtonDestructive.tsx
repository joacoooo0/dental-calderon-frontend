import { Button } from "@/components/ui/button";

export function ButtonDestructive(props: { name: string; icono: string }) {
  return (
    <Button
      className="font-normal flex items-center gap-2"
      variant="destructive"
    >
      <img src={props.icono} alt="" className="w-4 h-4 invert" />
      {props.name}
    </Button>
  );
}
