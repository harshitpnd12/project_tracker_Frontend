import { PlusIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../../components/ui/dialog";
import { ScrollArea } from "../../components/ui/scroll-area";
import { fetchProjectById } from "../../Redux/Project/Action";
import ChatBox from "./ChatBox";
import InviteUserForm from "./InviteUserForm";
import IssueList from "./IssueList";

const ProjectDetails = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);
  const { id } = useParams();
  const handleProjectInvitation = () => {};

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id]);

  return (
  <>
    <div className="h-[calc(100vh-80px)] overflow-x-hidden lg:px-12 px-2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="lg:flex gap-8 justify-between pb-6 h-full">
        <ScrollArea className="h-full lg:w-[69%] pr-4 bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-slate-700/50 shadow-2xl p-8">
          <div className="text-slate-200 pb-12 w-full">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-600/50">
                <h1 className="text-3xl font-bold text-white flex items-center">
                  <div className="mr-4 h-10 w-3 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  {project.projectDetails?.name}
                </h1>
              </div>
            </div>
            
            <div className="space-y-6 pb-12 text-base">
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-2xl border border-slate-600/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <p className="w-full md:max-w-lg lg:max-w-xl leading-relaxed text-slate-300">
                  {project.projectDetails?.description}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-2xl border border-slate-600/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <p className="w-36 font-semibold text-blue-400">Project Lead</p>
                  <p className="text-white font-bold text-lg">{project.projectDetails?.owner.fullName}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-2xl border border-slate-600/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <p className="w-36 font-semibold text-purple-400">Members :</p>
                  <div className="flex items-center gap-3 flex-wrap">
                    {project.projectDetails?.team.map((item) => (
                      <div key={item} className="flex items-center gap-2 bg-slate-600/30 px-3 py-2 rounded-xl hover:bg-slate-600/50 transition-colors">
                        <Avatar className="cursor-pointer h-10 w-10 ring-2 ring-slate-500 hover:ring-blue-400 transition-all duration-300 bg-gradient-to-br from-blue-500 to-purple-600">
                          <AvatarFallback className="text-white font-semibold text-sm">{item.fullName[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-slate-200 text-sm font-medium">{item.fullName}</span>
                      </div>
                    ))}
                    <Dialog>
                      <DialogTrigger>
                        <DialogClose>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleProjectInvitation}
                            className="ml-3 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            <span className="mr-2">invite</span>
                            <PlusIcon className="w-4 h-4" />
                          </Button>
                        </DialogClose>
                      </DialogTrigger>
                      <DialogContent className="bg-slate-800/95 backdrop-blur-xl text-white border border-slate-600/50 shadow-2xl">
                        <DialogHeader className="text-xl font-semibold">Invite User</DialogHeader>
                        <InviteUserForm />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-2xl border border-slate-600/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <p className="w-36 font-semibold text-emerald-400">Category</p>
                  <p className="text-white font-bold text-lg">{project.projectDetails?.category}</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-2xl border border-slate-600/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4">
                  <p className="w-36 font-semibold text-amber-400">Status</p>
                  <Badge className="bg-emerald-600/80 hover:bg-emerald-700 text-white px-4 py-2 rounded-full font-semibold backdrop-blur-sm shadow-lg" value="in_progress">
                    in_progress
                  </Badge>
                </div>
              </div>
            </div>
            
            <section>
              <div className="flex items-center gap-4 py-6 border-b border-slate-600/50 mb-8">
                <div className="h-8 w-2 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <p className="text-2xl font-bold text-white -tracking-wide">Tasks</p>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-600 to-transparent"></div>
              </div>
              <div className="lg:flex md:flex gap-6 justify-between py-6 space-y-6 lg:space-y-0 md:space-y-0">
                <div className="flex-1">
                  <IssueList status="pending" title="Todo List" />
                </div>
                <div className="flex-1">
                  <IssueList status="in_progress" title="In progress" />
                </div>
                <div className="flex-1">
                  <IssueList status="done" title="Done" />
                </div>
              </div>
            </section>
          </div>
        </ScrollArea>
         
        <div className="h-full lg:w-[30%] rounded-3xl bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 shadow-2xl overflow-hidden">
          <ChatBox />
          </div>
      </div>
    </div>
  </>
);
};

export default ProjectDetails;
