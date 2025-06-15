
import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, MapPin, Briefcase, DollarSign, Clock, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  type: 'job' | 'company' | 'skill';
  title: string;
  subtitle: string;
  location?: string;
  salary?: string;
  tags?: string[];
}

export const GlobalSearch = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Frontend Developer',
    'React',
    'Remote Jobs',
    'San Francisco'
  ]);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'job',
      title: 'Senior Frontend Developer',
      subtitle: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120k - $150k',
      tags: ['React', 'TypeScript', 'Remote']
    },
    {
      id: '2',
      type: 'job',
      title: 'Full Stack Engineer',
      subtitle: 'StartupXYZ',
      location: 'Remote',
      salary: '$95k - $130k',
      tags: ['Node.js', 'React', 'MongoDB']
    },
    {
      id: '3',
      type: 'company',
      title: 'Google',
      subtitle: 'Technology Company',
      location: 'Mountain View, CA',
      tags: ['Tech Giant', 'Innovation']
    },
    {
      id: '4',
      type: 'skill',
      title: 'React Development',
      subtitle: 'Frontend Framework',
      tags: ['JavaScript', 'UI/UX', 'Component-based']
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      // Simulate search
      const filtered = mockResults.filter(result =>
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        result.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Add to recent searches
      setRecentSearches(prev => {
        const updated = [searchQuery, ...prev.filter(s => s !== searchQuery)].slice(0, 5);
        return updated;
      });
      
      // Navigate to search results
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  const removeRecentSearch = (searchToRemove: string) => {
    setRecentSearches(prev => prev.filter(s => s !== searchToRemove));
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'job':
        return <Briefcase className="h-4 w-4 text-blue-600" />;
      case 'company':
        return <MapPin className="h-4 w-4 text-green-600" />;
      case 'skill':
        return <Clock className="h-4 w-4 text-purple-600" />;
      default:
        return <Search className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search jobs, companies, skills..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-12 h-12 text-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 rounded-xl shadow-lg"
        />
        <Button
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
          onClick={() => handleSearch(query)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="shadow-2xl border-2 border-gray-100 dark:border-gray-700">
              <CardContent className="p-0">
                {query.length > 0 ? (
                  <>
                    {results.length > 0 ? (
                      <div className="max-h-96 overflow-y-auto">
                        <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Search Results ({results.length})
                          </p>
                        </div>
                        {results.map((result) => (
                          <motion.div
                            key={result.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-50 dark:border-gray-800 last:border-b-0"
                            onClick={() => handleSearch(result.title)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="mt-1">
                                {getResultIcon(result.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {result.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                  {result.subtitle}
                                </p>
                                <div className="flex items-center space-x-4 mt-1">
                                  {result.location && (
                                    <span className="text-xs text-gray-500 flex items-center">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {result.location}
                                    </span>
                                  )}
                                  {result.salary && (
                                    <span className="text-xs text-gray-500 flex items-center">
                                      <DollarSign className="h-3 w-3 mr-1" />
                                      {result.salary}
                                    </span>
                                  )}
                                </div>
                                {result.tags && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {result.tags.slice(0, 3).map((tag, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 dark:text-gray-400">
                          No results found for "{query}"
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3"
                          onClick={() => handleSearch(query)}
                        >
                          Search anyway
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {recentSearches.length > 0 && (
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Recent Searches
                          </p>
                        </div>
                        <div className="space-y-2">
                          {recentSearches.map((search, index) => (
                            <motion.div
                              key={search}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                              className="flex items-center justify-between group"
                            >
                              <button
                                className="flex items-center space-x-2 text-left flex-1 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                onClick={() => handleSearch(search)}
                              >
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-sm">{search}</span>
                              </button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                                onClick={() => removeRecentSearch(search)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                        Popular Searches
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {['Frontend Developer', 'React', 'Remote', 'Full Stack', 'UI/UX'].map((term) => (
                          <Badge
                            key={term}
                            variant="outline"
                            className="cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors"
                            onClick={() => handleSearch(term)}
                          >
                            {term}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
