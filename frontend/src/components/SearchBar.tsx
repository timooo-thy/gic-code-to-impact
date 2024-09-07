import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  placeHolder: string;
};

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  placeHolder,
}: SearchBarProps) {
  return (
    <form className="flex-shrink-0">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeHolder}
          value={searchTerm}
          className="pl-8 w-full sm:w-[300px] md:w-[200px] lg:w-[300px]"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
}
