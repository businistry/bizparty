import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface ZipSearchFormProps {
  onSubmit?: (zipCode: string) => void;
  isLoading?: boolean;
  defaultZipCode?: string;
}

const ZipSearchForm = ({
  onSubmit = () => {},
  isLoading = false,
  defaultZipCode = "",
}: ZipSearchFormProps) => {
  const [zipCode, setZipCode] = React.useState(defaultZipCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(zipCode);
  };

  return (
    <Card className="w-[600px] bg-white/10 backdrop-blur-sm border-white/20 shadow-xl hover:border-blue-400/30 transition-all duration-300">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <div className="flex-1 relative group">
            <Input
              type="text"
              placeholder="Enter ZIP code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              pattern="[0-9]{5}"
              maxLength={5}
              className="text-lg bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400/50 transition-all"
              required
            />
            <div className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity -z-10" />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="min-w-[120px] bg-blue-500 hover:bg-blue-400 text-white transition-all duration-300 shadow-lg hover:shadow-blue-400/25"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Analyzing</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span>Analyze</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ZipSearchForm;
