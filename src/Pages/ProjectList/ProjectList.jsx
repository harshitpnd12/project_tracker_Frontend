import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MagnifyingGlassIcon,
  MixerHorizontalIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { ScrollArea } from "../../components/ui/scroll-area";
import { fetchProject, searchProjects } from "../../Redux/Project/Action";
import ProjectCard from "../Project/ProjectCard";

export const tags = [
  "all",
  "Reactjs",
  "Nextjs",
  "SpringBoot",
  "MySql",
  "Mongodb",
  "Angular",
  "JavaScript",
  "Ai/Ml",
  "Android",
  "React-Native",
  "CSS",
  "PHP",
  "NODEJS",
  "Html",
  "Python",
  "Flask",
  "Django",
];

const ProjectList = () => {
  const [keyword, setKeyword] = useState("");

  const { project } = useSelector((store) => store);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProject({}));
  }, [dispatch]);

  const handleFilterCategory = (value) => {
    if (value === "all") {
      dispatch(fetchProject({}));
    } else {
      dispatch(fetchProject({ category: value }));
    }
  };

  const handleFilterTags = (value) => {
    if (value === "all") {
      dispatch(fetchProject({}));
    } else {
      dispatch(fetchProject({ tag: value }));
    }
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    dispatch(searchProjects(e.target.value));
  };

  return (
    <>
      <div className="relative px-3 sm:px-4 md:px-6 lg:px-8 w-full mx-auto py-4 sm:py-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Filter Section */}
          <section className="filterSection w-full lg:w-64 xl:w-72 flex-shrink-0">
            <Card className="sticky top-4 shadow-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-xl overflow-hidden">
              <div className="flex justify-between items-center p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800">
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400 capitalize">Filters</p>
                <Button variant="ghost" size="icon" className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-blue-400 rounded-full transition-colors">
                  <MixerHorizontalIcon className="h-4 w-4" />
                </Button>
              </div>

              <CardContent className="p-0">
                <ScrollArea className="h-[50vh] sm:h-[55vh] md:h-[60vh]" type="always">
                  <div className="p-3 sm:p-4 space-y-6">
                    <div>
                      <h1 className="pb-2 text-sm font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                        Category
                      </h1>
                      <div className="pt-2">
                        <RadioGroup 
                          className="space-y-1"
                          defaultValue="all" 
                          onValueChange={(value) => handleFilterCategory(value)}
                        >
                          <div className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <RadioGroupItem value="all" id="r1" className="text-blue-600 dark:text-blue-400" />
                            <Label htmlFor="r1" className="cursor-pointer text-slate-800 dark:text-slate-200">All</Label>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <RadioGroupItem value="fullstack" id="r2" className="text-blue-600 dark:text-blue-400" />
                            <Label htmlFor="r2" className="cursor-pointer text-slate-800 dark:text-slate-200">Fullstack</Label>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <RadioGroupItem value="frontend" id="r3" className="text-blue-600 dark:text-blue-400" />
                            <Label htmlFor="r3" className="cursor-pointer text-slate-800 dark:text-slate-200">Frontend</Label>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <RadioGroupItem value="backend" id="r4" className="text-blue-600 dark:text-blue-400" />
                            <Label htmlFor="r4" className="cursor-pointer text-slate-800 dark:text-slate-200">Backend</Label>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <RadioGroupItem value="hackathon" id="r5" className="text-blue-600 dark:text-blue-400" />
                            <Label htmlFor="r5" className="cursor-pointer text-slate-800 dark:text-slate-200">Hackathon</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div>
                      <h1 className="pb-2 text-sm font-medium text-slate-600 dark:text-slate-300 uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                        Tag
                      </h1>
                      <div className="pt-2">
                        <RadioGroup
                          className="space-y-1"
                          defaultValue="all"
                          onValueChange={(value) => handleFilterTags(value)}
                        >
                          {tags.map((item) => (
                            <div key={item} className="flex items-center gap-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                              <RadioGroupItem value={item} id={`tag-${item}`} className="text-blue-600 dark:text-blue-400" />
                              <Label htmlFor={`tag-${item}`} className="cursor-pointer text-slate-800 dark:text-slate-200 capitalize">{item}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </section>

          {/* Project List Section */}
          <section className="projectListSection flex-1">
            <div className="flex gap-3 items-center pb-4 sm:pb-5">
              <div className="relative w-full max-w-md">
                <Input
                  onChange={handleSearchChange}
                  placeholder="Search projects..."
                  className="pl-9 pr-3 py-2 h-10 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400 transition-all"
                />
                <MagnifyingGlassIcon className="absolute top-3 left-3 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-12rem)] w-full" variant="ghost">
              <div className="space-y-4 sm:space-y-5 pb-4 pr-2">
                {keyword
                  ? project.searchProjects?.map((item, index) => (
                      <ProjectCard key={`search-${item.id}-${index}`} item={item} />
                    ))
                  : project.projects?.map((item) => (
                      <ProjectCard key={`project-${item.id}`} item={item} />
                    ))}
              </div>
            </ScrollArea>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProjectList;
