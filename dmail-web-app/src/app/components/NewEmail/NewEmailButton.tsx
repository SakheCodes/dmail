import { Button } from "@/components/ui/button";

type NewEmail = {
  setIsOpen: (flag: boolean) => void;
};

const NewEmailButton: React.FC<NewEmail> = ({ setIsOpen }) => {
  return <Button onClick={() => setIsOpen(true)}>+</Button>;
};

export default NewEmailButton;
