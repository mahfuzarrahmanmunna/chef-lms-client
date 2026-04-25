"use client";

import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // 1. Import Toast
import {
  Check,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Shield,
  FileText,
  Heart,
  Users,
} from "lucide-react";

// --- DATA SETS ---

// Step 1 Data (Career Goals)
const careerGoals = [
  {
    id: 1,
    text: "Working at a fine-dining restaurant",
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    text: "Working at a casual restaurant",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    text: "Owning a restaurant, food truck, etc.",
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    text: "Working at a hotel, resort, or cruise ship",
    img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    text: "Leading as a food & beverage manager",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    text: "Something else",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
  },
];

// Step 2 Data (Areas of Interest)
const interests = [
  {
    id: 1,
    text: "Culinary Arts",
    img: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    text: "Baking & Pastry Arts",
    img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    text: "Food Entrepreneurship",
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    text: "Plant-Based Culinary Arts",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    text: "Hospitality & Restaurant Operations",
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    text: "Holistic Nutrition & Wellness",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop",
  },
];

// Step 3 Data (User Profile)
const userProfile = [
  {
    id: 1,
    text: "High school student or recent grad",
    icon: <GraduationCap className="w-6 h-6 text-red-700" />,
  },
  {
    id: 2,
    text: "Some college or college graduate",
    icon: <FileText className="w-6 h-6 text-red-700" />,
  },
  {
    id: 3,
    text: "Already working in the culinary field",
    icon: <Briefcase className="w-6 h-6 text-red-700" />,
  },
  {
    id: 4,
    text: "Working and want to change careers",
    icon: <ArrowRight className="w-6 h-6 text-red-700" />,
  },
  {
    id: 5,
    text: "Restaurant or food business owner",
    icon: <Users className="w-6 h-6 text-red-700" />,
  },
  {
    id: 6,
    text: "U.S. military or veteran",
    icon: <Shield className="w-6 h-6 text-red-700" />,
  },
  {
    id: 7,
    text: "International student",
    icon: <MapPin className="w-6 h-6 text-red-700" />,
  },
  {
    id: 8,
    text: "None of these describe me",
    icon: <Users className="w-6 h-6 text-red-700" />,
  },
];

// Step 4 Data (Barriers)
const barriers = [
  { id: 1, text: "Nothing can get in the way... I'm committed!" },
  { id: 2, text: "Paying for school" },
  { id: 3, text: "Too busy; not enough time" },
  { id: 4, text: "Family commitments" },
  { id: 5, text: "Convincing a spouse, parent, or other person" },
  { id: 6, text: "Not sure if culinary school is worth it" },
];

// --- MAIN COMPONENT ---

const QuizPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState({
    step1: [],
    step2: [],
    step3: [],
    step4: [],
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "Bangladesh +880", // Added state for country code
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Multi-select toggles
  const toggleSelection = (step: number, id: number) => {
    const stepKey = `step${step}` as keyof typeof selections;
    const current = selections[stepKey] as number[];

    if (current.includes(id)) {
      setSelections({
        ...selections,
        [stepKey]: current.filter((x) => x !== id),
      });
    } else {
      setSelections({ ...selections, [stepKey]: [...current, id] });
    }
  };

  const isSelected = (step: number, id: number) => {
    const stepKey = `step${step}` as keyof typeof selections;
    return (selections[stepKey] as number[]).includes(id);
  };

  // Navigation Logic
  const handleNext = async () => {
    if (currentStep < 5) {
      // Validation
      if (
        currentStep < 5 &&
        (
          selections[
            `step${currentStep}` as keyof typeof selections
          ] as number[]
        ).length === 0
      ) {
        toast.error("Please select at least one option.");
        return;
      }
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Final Submit
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.phone
      ) {
        toast.error("Please fill in all fields.");
        return;
      }

      setIsSubmitting(true);

      try {
        const response = await fetch("/api/quiz-submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            selections: selections,
          }),
        });

        if (response.ok) {
          toast.success(
            "Form Submitted Successfully! Check your email for your Roadmap.",
          );
          // Optional: Reset form or redirect
        } else {
          throw new Error("Submission failed");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans pb-20">
      {/* Toast Container */}
      <Toaster position="top-center" />

      <div className="container mx-auto px-4 max-w-5xl py-12">
        {/* Progress Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl  font-bold text-gray-900 mb-6">
            Unlock Your Culinary School Roadmap!
          </h1>

          <div className="flex justify-center items-center gap-4 mb-4">
            <span className="text-sm font-bold text-red-700 tracking-wide uppercase">
              Step {currentStep} of 5
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5 max-w-md mx-auto">
            <div
              className="bg-red-700 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* --- STEP 1: Career Goals --- */}
        {currentStep === 1 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                If you could start your dream career today, where would you be?
              </h2>
              <p className="text-gray-500 mt-2">Choose all that apply.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {careerGoals.map((opt) => (
                <SelectionCard
                  key={opt.id}
                  {...opt}
                  selected={isSelected(1, opt.id)}
                  onClick={() => toggleSelection(1, opt.id)}
                />
              ))}
            </div>
          </>
        )}

        {/* --- STEP 2: Areas of Interest --- */}
        {currentStep === 2 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                What areas of study are you most interested in?
              </h2>
              <p className="text-gray-500 mt-2">Check all that apply.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {interests.map((opt) => (
                <SelectionCard
                  key={opt.id}
                  {...opt}
                  selected={isSelected(2, opt.id)}
                  onClick={() => toggleSelection(2, opt.id)}
                />
              ))}
            </div>
          </>
        )}

        {/* --- STEP 3: User Profile --- */}
        {currentStep === 3 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                Which of these best describes you?
              </h2>
              <p className="text-gray-500 mt-2">Check all that apply.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-4xl mx-auto">
              {userProfile.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => toggleSelection(3, opt.id)}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected(3, opt.id)
                      ? "bg-red-50 border-red-700 shadow-sm"
                      : "bg-white border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full bg-gray-100 ${isSelected(3, opt.id) ? "bg-red-100 text-red-700" : "text-gray-400"}`}
                  >
                    {opt.icon}
                  </div>
                  <span className="font-medium text-gray-800">{opt.text}</span>
                  {isSelected(3, opt.id) && (
                    <Check className="ml-auto text-red-700 w-5 h-5" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* --- STEP 4: Barriers --- */}
        {currentStep === 4 && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                What could get in the way of your culinary dreams?
              </h2>
              <p className="text-gray-500 mt-2">Check all that apply.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-4xl mx-auto">
              {barriers.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => toggleSelection(4, opt.id)}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected(4, opt.id)
                      ? "bg-red-50 border-red-700 shadow-sm"
                      : "bg-white border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <span className="font-medium text-gray-800 flex-1">
                    {opt.text}
                  </span>
                  {isSelected(4, opt.id) && (
                    <Check className="text-red-700 w-5 h-5" />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* --- STEP 5: Contact Form --- */}
        {currentStep === 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
            {/* Left Column: Form */}
            <div className="lg:col-span-3 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Last step! Enter your information and get access to your
                Academic Plan!
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-gray-700">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700">
                    Phone *
                  </label>
                  <div className="flex gap-2">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded block p-3 w-32"
                      value={formData.countryCode}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          countryCode: e.target.value,
                        })
                      }
                    >
                      <option>Bangladesh +880</option>
                      <option>USA +1</option>
                      <option>UK +44</option>
                    </select>
                    <input
                      type="tel"
                      className="flex-1 p-3 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:outline-none"
                      placeholder="17XXXX-XXXXX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Illustration & Benefits */}
            <div className="lg:col-span-2 bg-gray-900 p-8 rounded-xl flex flex-col justify-center text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

              <div className="relative z-10 text-center">
                <div className="w-48 h-48 mx-auto mb-6 bg-white rounded-full flex items-center justify-center overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=400&auto=format&fit=crop"
                    alt="Chef Illustration"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="text-2xl  font-bold mb-6">
                  What’s Inside?
                </h3>

                <div className="space-y-4 text-left bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <BenefitItem
                    icon={<FileText className="w-5 h-5 text-red-400" />}
                    text="Financial resources"
                  />
                  <BenefitItem
                    icon={<Briefcase className="w-5 h-5 text-red-400" />}
                    text="Career insights"
                  />
                  <BenefitItem
                    icon={<GraduationCap className="w-5 h-5 text-red-400" />}
                    text="Academic planner"
                  />
                  <BenefitItem
                    icon={<Heart className="w-5 h-5 text-red-400" />}
                    text="Life success planner"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center max-w-3xl mx-auto">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-lg transition-all ${
              currentStep === 1
                ? "invisible"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-10 py-4 rounded-full font-bold text-lg uppercase tracking-wider shadow-lg transition-all transform hover:-translate-y-1 ${
              isSubmitting
                ? "bg-gray-400 text-white cursor-wait"
                : "bg-red-700 text-white hover:bg-red-800 hover:shadow-red-700/40"
            }`}
          >
            {isSubmitting
              ? "Sending..."
              : currentStep === 5
                ? "Get My Plan"
                : "Next"}
            {!isSubmitting && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const SelectionCard: React.FC<{
  id: number;
  text: string;
  img: string;
  selected: boolean;
  onClick: () => void;
}> = ({ text, img, selected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative group cursor-pointer rounded-xl overflow-hidden h-56 border-4 shadow-md hover:shadow-xl transition-all duration-300 ${
        selected ? "border-red-700" : "border-transparent"
      }`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${img})` }}
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

      {selected && (
        <div className="absolute top-3 right-3 bg-red-700 text-white rounded-full p-1 shadow-lg">
          <Check className="w-5 h-5" />
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/90 to-transparent">
        <p className="text-white font-bold text-base leading-tight">{text}</p>
      </div>
    </div>
  );
};

const BenefitItem: React.FC<{ icon: React.ReactNode; text: string }> = ({
  icon,
  text,
}) => (
  <div className="flex items-center gap-3">
    {icon}
    <span className="font-medium">{text}</span>
  </div>
);

export default QuizPage;
