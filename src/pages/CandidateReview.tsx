
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  ArrowLeft, 
  User, 
  Briefcase, 
  Clock,
  ChevronDown,
  ChevronUp,
  FileText,
  Star,
  Download,
  Mail,
  Calendar,
  ArrowRight,
  CheckSquare,
  XSquare,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Mock candidates data
const candidatesData = [
  {
    id: "1",
    name: "John Smith",
    position: "Senior Frontend Developer",
    applied: "2 days ago",
    location: "San Francisco, CA (Remote OK)",
    experience: "7+ years",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    education: "B.S. Computer Science, Stanford University",
    status: "New",
    resumeUrl: "#",
    rating: 4.5,
    coverLetter: "I'm excited to apply for the Senior Frontend Developer position. With 7+ years of experience building scalable web applications using React and TypeScript, I believe I would be a great addition to your team...",
    notes: "Strong technical background. Good cultural fit. Schedule technical interview.",
    matches: 92
  },
  {
    id: "2",
    name: "Alice Johnson",
    position: "Senior Frontend Developer",
    applied: "1 week ago",
    location: "New York, NY",
    experience: "5+ years",
    skills: ["React", "Vue.js", "JavaScript", "CSS3", "UI/UX"],
    education: "M.S. Human-Computer Interaction, MIT",
    status: "Screening",
    resumeUrl: "#",
    rating: 4.0,
    coverLetter: "I am writing to express my interest in the Senior Frontend Developer position. With my background in both engineering and design, I bring a unique perspective to creating exceptional user experiences...",
    notes: "Excellent UI/UX skills. Consider for design-heavy projects.",
    matches: 86
  },
  {
    id: "3",
    name: "David Chen",
    position: "Senior Frontend Developer",
    applied: "4 days ago",
    location: "Remote",
    experience: "6+ years",
    skills: ["React", "Redux", "Angular", "Jest", "Webpack"],
    education: "B.S. Software Engineering, UC Berkeley",
    status: "Interview Scheduled",
    resumeUrl: "#",
    rating: 4.2,
    coverLetter: "I am applying for the Senior Frontend Developer role at your company. I've been working with modern JavaScript frameworks for over 6 years and have led frontend development for several successful products...",
    notes: "Strong technical skills. Previous experience with similar products.",
    matches: 88
  },
  {
    id: "4",
    name: "Sarah Williams",
    position: "Senior Frontend Developer",
    applied: "1 day ago",
    location: "Chicago, IL (Willing to relocate)",
    experience: "8+ years",
    skills: ["React", "TypeScript", "Accessibility", "Performance Optimization", "Next.js"],
    education: "B.A. Computer Science, University of Chicago",
    status: "New",
    resumeUrl: "#",
    rating: 4.8,
    coverLetter: "I'm excited about the opportunity to bring my frontend expertise to your team. With 8+ years of experience focusing on accessible, performant web applications, I believe I can make significant contributions...",
    notes: "",
    matches: 95
  },
  {
    id: "5",
    name: "Michael Rodriguez",
    position: "Senior Frontend Developer",
    applied: "3 days ago",
    location: "Austin, TX",
    experience: "4+ years",
    skills: ["React", "JavaScript", "CSS", "RESTful APIs", "Git"],
    education: "B.S. Information Technology, UT Austin",
    status: "Rejected",
    resumeUrl: "#",
    rating: 3.2,
    coverLetter: "I am interested in the Senior Frontend Developer position at your company. I have 4 years of experience building web applications and am eager to join a forward-thinking team...",
    notes: "Not enough senior-level experience. Consider for mid-level positions.",
    matches: 72
  }
];

// Filter options
const statusOptions = ["All", "New", "Screening", "Interview Scheduled", "Offer", "Rejected"];
const sortOptions = ["Match %", "Recent", "Name", "Rating"];

const CandidateReview = () => {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Match %");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter and sort candidates
  const filteredCandidates = candidatesData
    .filter(candidate => 
      (filterStatus === "All" || candidate.status === filterStatus) &&
      (searchQuery === "" || 
        candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "Match %":
          return b.matches - a.matches;
        case "Recent":
          return a.applied.includes("day") ? -1 : 1;
        case "Name":
          return a.name.localeCompare(b.name);
        case "Rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500";
      case "Screening":
        return "bg-purple-500";
      case "Interview Scheduled":
        return "bg-amber-500";
      case "Offer":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  
  const handleStatusChange = (candidateId: string, newStatus: string) => {
    toast.success(`Candidate status updated to ${newStatus}`);
    // In a real app, this would update the status in the database
  };
  
  const handleScheduleInterview = (candidateId: string) => {
    toast.success(`Interview scheduling modal would open here`);
    // In a real app, this would open a modal to schedule the interview
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate('/employers')}
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Candidate Review</h1>
              <p className="text-gray-600">Senior Frontend Developer - TechCorp Inc.</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => toast.success("Exported to CSV")}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="bg-primary-gradient">
                <Mail className="h-4 w-4 mr-2" />
                Invite Candidates
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Candidate List */}
            <div className="lg:col-span-1">
              <Card className="p-4 mb-6">
                <div className="mb-4">
                  <Input
                    placeholder="Search by name or skill..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="space-x-2">
                    <select 
                      className="text-sm border rounded p-1"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    <select
                      className="text-sm border rounded p-1"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      {sortOptions.map(option => (
                        <option key={option} value={option}>Sort: {option}</option>
                      ))}
                    </select>
                  </div>
                  <span className="text-sm text-gray-500">{filteredCandidates.length} candidates</span>
                </div>
                
                <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">
                  {filteredCandidates.map(candidate => (
                    <div 
                      key={candidate.id}
                      className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                        selectedCandidate === candidate.id ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedCandidate(candidate.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-medium">{candidate.name}</h3>
                            <p className="text-xs text-gray-500">{candidate.location}</p>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(candidate.status)}`}>
                          {candidate.status}
                        </Badge>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">Applied {candidate.applied}</span>
                          <div className="flex items-center">
                            <span className="font-medium mr-1">{candidate.matches}%</span>
                            <span className="text-xs text-gray-500">match</span>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap gap-1">
                          {candidate.skills.slice(0, 3).map((skill, idx) => (
                            <span 
                              key={idx} 
                              className="inline-block text-xs px-2 py-1 bg-gray-100 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                          {candidate.skills.length > 3 && (
                            <span className="inline-block text-xs px-2 py-1 bg-gray-100 rounded-full">
                              +{candidate.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            {/* Candidate Details */}
            <div className="lg:col-span-2">
              {selectedCandidate ? (
                <>
                  {candidatesData.filter(c => c.id === selectedCandidate).map(candidate => (
                    <div key={candidate.id} className="space-y-6">
                      <Card className="p-6">
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 text-xl font-medium">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h2 className="text-2xl font-bold">{candidate.name}</h2>
                              <p className="text-gray-600">{candidate.location}</p>
                              <div className="mt-1 flex items-center">
                                <Badge className={`${getStatusColor(candidate.status)} mr-2`}>
                                  {candidate.status}
                                </Badge>
                                <span className="text-sm text-gray-500">Applied {candidate.applied}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="inline-flex items-center bg-primary-gradient text-white font-medium rounded-full px-3 py-1">
                              <span className="text-lg mr-1">{candidate.matches}%</span>
                              <span className="text-xs">match</span>
                            </div>
                            <div className="mt-2 flex items-center justify-end">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`h-4 w-4 ${star <= Math.floor(candidate.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                                />
                              ))}
                              <span className="text-sm ml-1">{candidate.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <Briefcase className="h-5 w-5 text-primary mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Experience</p>
                              <p className="font-medium">{candidate.experience}</p>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <User className="h-5 w-5 text-primary mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Education</p>
                              <p className="font-medium">{candidate.education}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h3 className="font-semibold mb-2">Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill, idx) => (
                              <span 
                                key={idx} 
                                className="inline-block px-3 py-1 bg-gray-100 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-3 mb-6">
                          <Button className="w-full" onClick={() => window.open(candidate.resumeUrl)}>
                            <FileText className="h-4 w-4 mr-2" />
                            View Resume
                          </Button>
                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" onClick={() => handleScheduleInterview(candidate.id)}>
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule Interview
                            </Button>
                            <Button variant="outline" onClick={() => navigate(`/video-interview/${candidate.id}`)}>
                              <ArrowRight className="h-4 w-4 mr-2" />
                              Start Interview
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-2">Update Status</h3>
                          <div className="flex flex-wrap gap-2">
                            {statusOptions.filter(s => s !== "All" && s !== candidate.status).map(status => (
                              <Button 
                                key={status} 
                                variant="outline" 
                                size="sm"
                                className={`${status === "Rejected" ? "border-red-300 hover:bg-red-50" : ""}`}
                                onClick={() => handleStatusChange(candidate.id, status)}
                              >
                                {status === "Rejected" ? (
                                  <XSquare className="h-4 w-4 mr-1 text-red-500" />
                                ) : status === "Offer" ? (
                                  <CheckSquare className="h-4 w-4 mr-1 text-green-500" />
                                ) : (
                                  <></>
                                )}
                                {status}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </Card>
                      
                      <Tabs defaultValue="cover-letter">
                        <TabsList className="mb-4">
                          <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                          <TabsTrigger value="notes">Notes</TabsTrigger>
                          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="cover-letter">
                          <Card className="p-6">
                            <p className="whitespace-pre-line">{candidate.coverLetter}</p>
                          </Card>
                        </TabsContent>
                        
                        <TabsContent value="notes">
                          <Card className="p-6">
                            <textarea 
                              className="w-full border rounded-lg p-3 min-h-[200px]"
                              placeholder="Add notes about this candidate..."
                              defaultValue={candidate.notes}
                            ></textarea>
                            <div className="flex justify-end mt-4">
                              <Button onClick={() => toast.success("Notes saved")}>
                                Save Notes
                              </Button>
                            </div>
                          </Card>
                        </TabsContent>
                        
                        <TabsContent value="evaluation">
                          <Card className="p-6">
                            <div className="space-y-6">
                              <div>
                                <h3 className="font-semibold mb-3">Technical Skills</h3>
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm font-medium">React</span>
                                      <span className="text-sm text-gray-500">4.5/5</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full">
                                      <div className="h-2 bg-primary rounded-full" style={{ width: '90%' }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm font-medium">TypeScript</span>
                                      <span className="text-sm text-gray-500">4.2/5</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full">
                                      <div className="h-2 bg-primary rounded-full" style={{ width: '84%' }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm font-medium">Node.js</span>
                                      <span className="text-sm text-gray-500">3.8/5</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full">
                                      <div className="h-2 bg-primary rounded-full" style={{ width: '76%' }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="font-semibold mb-3">Soft Skills</h3>
                                <div className="space-y-3">
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm font-medium">Communication</span>
                                      <span className="text-sm text-gray-500">4.7/5</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full">
                                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '94%' }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm font-medium">Problem Solving</span>
                                      <span className="text-sm text-gray-500">4.5/5</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full">
                                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '90%' }}></div>
                                    </div>
                                  </div>
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-sm font-medium">Teamwork</span>
                                      <span className="text-sm text-gray-500">4.2/5</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full">
                                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '84%' }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="font-semibold mb-3">Assessment Results</h3>
                                <p className="text-sm text-gray-700 mb-3">
                                  Candidate completed 2 assessments with the following results:
                                </p>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium">React Coding Challenge</span>
                                    <Badge className="bg-green-500">92%</Badge>
                                  </div>
                                  <div className="flex justify-between items-center border-b pb-2">
                                    <span className="font-medium">Frontend General Knowledge</span>
                                    <Badge className="bg-green-500">88%</Badge>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex justify-end">
                                <Button className="flex items-center">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Request Additional Assessment
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </TabsContent>
                      </Tabs>
                    </div>
                  ))}
                </>
              ) : (
                <Card className="p-8 flex items-center justify-center h-[400px]">
                  <div className="text-center">
                    <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-1">No Candidate Selected</h3>
                    <p className="text-gray-500">Click on a candidate from the list to view details</p>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CandidateReview;
