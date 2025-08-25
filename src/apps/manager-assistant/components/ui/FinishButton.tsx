import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

interface FinishButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const FinishButton: React.FC<FinishButtonProps> = ({ 
  onClick, 
  disabled = false, 
  loading = false 
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 h-12 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md"
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <CheckCircle className="w-5 h-5" />
          <span>Proceed</span>
          <ArrowRight className="w-4 h-4" />
        </>
      )}
    </Button>
  );
};

export default FinishButton;
