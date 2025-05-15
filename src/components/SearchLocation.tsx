import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Areas } from "@/lib/data/Areas";
import useLocationStore from "@/stores/location";

export function SearchLocation() {
  const [open, setOpen] = React.useState(false);
  const { selectedArea, setSelectedArea } = useLocationStore();

  const handleSelectArea = (value: string) => {
    const selected = Areas.find((area) => area.value === value);
    if (selected && selectedArea?.value !== selected.value) {
      setSelectedArea(selected);
    }
    setOpen(false);
  };

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">City</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedArea ? <>{selectedArea.label}</> : <>+ Choose city</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          sideOffset={4}
          className="w-[170px] max-w-xs p-0"
        >
          <Command>
            <CommandInput placeholder="Change city..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {Areas.map((area) => (
                  <CommandItem
                    key={area.value}
                    value={area.value}
                    onSelect={() => handleSelectArea(area.value)} // 선택 시 상태 업데이트
                  >
                    {area.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
