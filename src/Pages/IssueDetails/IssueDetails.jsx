import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { ScrollArea } from "../../components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { fetchComments } from "../../Redux/Comment/Action";
import { fetchIssueById, updateIssueStatus } from "../../Redux/Issue/Action";
import CommentCard from "./CommentCard";
import CreateCommentForm from "./CreateCommentForm";

const IssueDetails = () => {
  const { projectId, issueId } = useParams();

  const dispatch = useDispatch();

  const { issue, comment } = useSelector((store) => store);

  const handleUpdateIssueStatus = (status) => {
    dispatch(updateIssueStatus({ status, id: issueId }));
    toast.success("Status changed successfully");
    console.log(status);
  };

  useEffect(() => {
    dispatch(fetchIssueById(issueId));
    dispatch(fetchComments(issueId));
  }, [issueId]);

  return (
    <div className="px-20 py-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 h-[calc(100vh-80px)] overflow-hidden">
      <div className="flex justify-between gap-8 bg-slate-800/60 backdrop-blur-xl p-10 rounded-3xl border border-slate-700/50 shadow-2xl h-full">
        <ScrollArea className="h-[calc(100vh-200px)] w-[60%] pr-4">
          <div className="text-slate-200">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-600/50">
                <h1 className="font-bold text-3xl text-white flex items-center">
                  <div className="mr-4 h-10 w-3 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                  {issue.issueDetails?.title
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </h1>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-2xl border border-slate-600/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300 mb-6">
              <h2 className="font-semibold text-xl text-blue-400 mb-4 flex items-center gap-3">
                <div className="h-5 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                Description
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {issue.issueDetails?.description
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 p-6 rounded-2xl border border-slate-600/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <h1 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="h-5 w-1 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
                Activity
              </h1>
              <Tabs defaultValue="comments" className="w-full">
                <TabsList className="mb-6 bg-slate-700/50 backdrop-blur-sm border border-slate-600/30 p-1 rounded-xl">
                  <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-slate-300 rounded-lg px-4 py-2 transition-all duration-300">All</TabsTrigger>
                  <TabsTrigger value="comments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-slate-300 rounded-lg px-4 py-2 transition-all duration-300">Comments</TabsTrigger>
                  <TabsTrigger value="history" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-slate-300 rounded-lg px-4 py-2 transition-all duration-300">History</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="text-slate-300">
                  all make change to your account here
                </TabsContent>
                <TabsContent value="comments">
                  <CreateCommentForm issueId={issueId} />
                  <div className="mt-8 space-y-6">
                    {comment.comments.map((item) => (
                      <CommentCard item={item} key={item} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="history" className="text-slate-300">
                  history change your password here
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </ScrollArea>

        <div className="w-full lg:w-[30%] space-y-6">
          <Select onValueChange={handleUpdateIssueStatus}>
            <SelectTrigger className="w-[200px] bg-gradient-to-r from-slate-700/50 to-slate-800/50 border border-slate-600/50 text-slate-200 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <SelectValue placeholder="TO DO" className="text-slate-200" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 text-slate-200">
              <SelectItem value="pending" className="hover:bg-slate-700/50">To Do</SelectItem>
              <SelectItem value="in_progress" className="hover:bg-slate-700/50">in_progress</SelectItem>
              <SelectItem value="done" className="hover:bg-slate-700/50">Done</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="bg-gradient-to-br from-slate-700/50 to-slate-800/50 rounded-2xl border border-slate-600/30 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <p className="bg-gradient-to-r from-slate-600/50 to-slate-700/50 border-b border-slate-600/30 py-4 px-6 text-white font-semibold text-lg">Details</p>
            <div className="p-6">
              <div className="space-y-6">
                <div className="flex gap-6 items-center p-3 rounded-xl hover:bg-slate-600/20 transition-colors">
                  <p className="w-[7rem] font-medium text-purple-400">Assignee</p>
                  {issue.issueDetails?.assignee?.fullName ? (
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 text-sm ring-2 ring-slate-500 hover:ring-blue-400 transition-all duration-300 bg-gradient-to-br from-blue-500 to-purple-600">
                        <AvatarFallback className="text-white font-semibold">
                          {issue.issueDetails?.assignee?.fullName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-slate-200 font-medium">{issue.issueDetails?.assignee?.fullName}</p>
                    </div>
                  ) : (
                    <p className="text-slate-400 italic">UnAssigned</p>
                  )}
                </div>
                
                {/* <div className="flex gap-6 items-center p-3 rounded-xl hover:bg-slate-600/20 transition-colors">
                  <p className="w-[7rem] font-medium text-emerald-400">Labels</p>
                  <p className="text-slate-400 italic">None</p>
                </div> */}
                
                <div className="flex gap-6 items-center p-3 rounded-xl hover:bg-slate-600/20 transition-colors">
                  <p className="w-[7rem] font-medium text-blue-400">Status</p>
                  <Badge className="bg-gradient-to-r from-emerald-600/80 to-blue-600/80 hover:from-emerald-700 hover:to-blue-700 text-white px-3 py-1 rounded-full font-semibold backdrop-blur-sm shadow-lg">{issue.issueDetails?.status}</Badge>
                </div>
                
                <div className="flex gap-6 items-center p-3 rounded-xl hover:bg-slate-600/20 transition-colors">
                  <p className="w-[7rem] font-medium text-amber-400">Release</p>
                  <p className="text-slate-200 font-medium">
  {issue.issueDetails?.dueDate &&
    new Date(issue.issueDetails.dueDate).toLocaleDateString("en-GB")}
</p>

                </div>
                
                <div className="flex gap-6 items-center p-3 rounded-xl hover:bg-slate-600/20 transition-colors">
                  <p className="w-[7rem] font-medium text-cyan-400">Reporter</p>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 text-sm ring-2 ring-slate-500 hover:ring-cyan-400 transition-all duration-300 bg-gradient-to-br from-cyan-500 to-blue-600">
                      <AvatarFallback className="text-white font-semibold">
                        {issue.issueDetails?.reporter?.fullName?.[0] || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-slate-200 font-medium">
                      {issue.issueDetails?.reporter?.fullName || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
