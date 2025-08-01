import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VacansyFilter = () => {
  return (
    <div className="w-[100%] bg-white pl-[140px] pr-[140px] pb-10 gap-4 flex flex-row ">
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="კატეგორიები" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>კატეგორიები</SelectLabel>
              <SelectItem value="საბანკო სფერო">საბანკო სფერო</SelectItem>
              <SelectItem value="IT დეველოპმენტი">IT დეველოპმენტი</SelectItem>
              <SelectItem value="გაყიდვები/ვაჭრობა">
                გაყიდვები/ვაჭრობა
              </SelectItem>
              <SelectItem value="საოფისე">საოფისე</SelectItem>
              <SelectItem value="მომსახურე პერსონალი">
                მომსახურე პერსონალი
              </SelectItem>
              <SelectItem value="მედიცინა/ფარმაცევტი">
                მედიცინა/ფარმაცევტი
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ენები" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>ენები</SelectLabel>
              <SelectItem value="ქართული">ქართული</SelectItem>
              <SelectItem value="ინგლისური">ინგლისური</SelectItem>
              <SelectItem value="რუსული">რუსული</SelectItem>
              <SelectItem value="ესპანური">ესპანური</SelectItem>
              <SelectItem value="იტალიური">იტალიური</SelectItem>
              <SelectItem value="თურქული">თურქული</SelectItem>
              <SelectItem value="გერმანული">გერმანული</SelectItem>
              <SelectItem value="ფრანგული">ფრანგული</SelectItem>
              <SelectItem value="კორეული">კორეული</SelectItem>
              <SelectItem value="ჩინური">ჩინური</SelectItem>
              <SelectItem value="იაპონური">იაპონური</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="სამუშაო ტიპი" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>სამუშაო ტიპი</SelectLabel>
              <SelectItem value="ოფისი">ოფისი</SelectItem>
              <SelectItem value="IT დისტანციური">IT დისტანციური</SelectItem>
              <SelectItem value="ჰიბრიდი">ჰიბრიდი</SelectItem>
              <SelectItem value="თავისუფალი გრაფიკი">
                თავისუფალი გრაფიკი
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ლოკაცია" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>ლოკაცია</SelectLabel>
              <SelectItem value="თბილისი">თბილისი</SelectItem>
              <SelectItem value="ბათუმი">ბათუმი</SelectItem>
              <SelectItem value="ქუთაისი">ქუთაისი</SelectItem>
              <SelectItem value="რუსთავი">რუსთავი</SelectItem>
              <SelectItem value="გორი">გორი</SelectItem>
              <SelectItem value="ზუგდიდი">ზუგდიდი</SelectItem>
              <SelectItem value="ფოთი">ფოთი</SelectItem>
              <SelectItem value="თელავი">თელავი</SelectItem>
              <SelectItem value="სოხუმი">სოხუმი</SelectItem>
              <SelectItem value="ხაშური">ხაშური</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="გამოცდილება" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>გამოცდილება</SelectLabel>
              <SelectItem value="0-2 წლამდე">0-2 წლამდე</SelectItem>
              <SelectItem value="2-5 წლამდე">2-5 წლამდე</SelectItem>
              <SelectItem value="5+ წელი">5+ წელი</SelectItem>
              <SelectItem value="გამოუცდელი">გამოუცდელი</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <button
        type="submit"
        className="font-semibold w-[250px] h-[38px] cursor-pointer rounded-[10px] hover:bg-gray-100 flex items-center justify-center text-red-700 "
      >
        ფილტრების გასუფთავება
      </button>
    </div>
  );
};

export default VacansyFilter;
