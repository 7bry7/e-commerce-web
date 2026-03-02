import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, X, FileText, Image as ImageIcon, DollarSign, Info, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type FormData = {
  title: string;
  category: string;
  description: string;
  price: string;
};

export default function UploadProductForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [isDraggingThumb, setIsDraggingThumb] = useState(false);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Drag and Drop Handlers
  const handleDrag = useCallback((e: React.DragEvent, setDragging: (v: boolean) => void) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, setFile: (f: File) => void, setDragging: (v: boolean) => void) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log({ ...data, thumbnail, mainFile });
    setIsSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-[#0f1420] border border-slate-800 rounded-xl">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="w-20 h-20 bg-[#00D28A]/20 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-[#00D28A]" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-2">Asset Published Successfully!</h2>
        <p className="text-slate-400 mb-8">Your product is now live on the marketplace.</p>
        <div className="flex gap-4">
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
          >
            Upload Another
          </button>
          <button className="px-6 py-2 bg-[#00D28A] hover:bg-[#00b074] text-black rounded-lg font-bold transition-colors">
            View Product
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Upload New Asset</h1>
          <p className="text-sm text-slate-500">Fill in the details below to publish your digital product.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Asset Title</label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="e.g., Cyberpunk City Asset Pack"
              className="w-full bg-[#0f1420] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D28A] focus:ring-1 focus:ring-[#00D28A] transition-all placeholder:text-slate-600"
            />
            {errors.title && <span className="text-red-500 text-xs">Title is required</span>}
          </div>

          {/* Category & Price Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Category</label>
              <div className="relative">
                <select
                  {...register("category", { required: true })}
                  className="w-full bg-[#0f1420] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D28A] focus:ring-1 focus:ring-[#00D28A] appearance-none cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option value="ui-kits">UI Kits</option>
                  <option value="3d-models">3D Models</option>
                  <option value="icons">Icons</option>
                  <option value="fonts">Fonts</option>
                  <option value="textures">Textures</option>
                  <option value="audio">Audio</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Price (USD)</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  {...register("price", { required: true, min: 0 })}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full bg-[#0f1420] border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#00D28A] focus:ring-1 focus:ring-[#00D28A] transition-all placeholder:text-slate-600"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Description</label>
            <textarea
              {...register("description", { required: true })}
              rows={8}
              placeholder="Describe your asset, features, and compatibility..."
              className="w-full bg-[#0f1420] border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D28A] focus:ring-1 focus:ring-[#00D28A] transition-all placeholder:text-slate-600 resize-none"
            />
             <p className="text-xs text-slate-500 text-right">Markdown supported</p>
          </div>
        </div>

        {/* Right Column: Uploads */}
        <div className="space-y-6">
          
          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              Cover Image <Info className="w-3 h-3 text-slate-500" />
            </label>
            <div
              onDragEnter={(e) => handleDrag(e, setIsDraggingThumb)}
              onDragLeave={(e) => handleDrag(e, setIsDraggingThumb)}
              onDragOver={(e) => handleDrag(e, setIsDraggingThumb)}
              onDrop={(e) => handleDrop(e, setThumbnail, setIsDraggingThumb)}
              className={`relative h-48 rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center p-4 text-center cursor-pointer overflow-hidden ${
                isDraggingThumb 
                  ? 'border-[#00D28A] bg-[#00D28A]/10' 
                  : thumbnail 
                    ? 'border-slate-700 bg-[#0f1420]'
                    : 'border-slate-700 hover:border-slate-500 bg-[#0f1420]'
              }`}
            >
              {thumbnail ? (
                <>
                  <img 
                    src={URL.createObjectURL(thumbnail)} 
                    alt="Preview" 
                    className="absolute inset-0 w-full h-full object-cover opacity-50" 
                  />
                  <div className="relative z-10 flex flex-col items-center">
                    <p className="text-white text-sm font-medium truncate max-w-[200px]">{thumbnail.name}</p>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setThumbnail(null); }}
                      className="mt-2 p-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => e.target.files && setThumbnail(e.target.files[0])}
                  />
                  <ImageIcon className="w-8 h-8 text-slate-500 mb-3" />
                  <p className="text-sm text-slate-300 font-medium">Drag cover image here</p>
                  <p className="text-xs text-slate-500 mt-1">1920x1080 recommended</p>
                </>
              )}
            </div>
          </div>

          {/* Main File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              Asset File (.zip) <Info className="w-3 h-3 text-slate-500" />
            </label>
            <div
              onDragEnter={(e) => handleDrag(e, setIsDraggingFile)}
              onDragLeave={(e) => handleDrag(e, setIsDraggingFile)}
              onDragOver={(e) => handleDrag(e, setIsDraggingFile)}
              onDrop={(e) => handleDrop(e, setMainFile, setIsDraggingFile)}
              className={`relative h-32 rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center p-4 text-center cursor-pointer ${
                isDraggingFile 
                  ? 'border-[#00D28A] bg-[#00D28A]/10' 
                  : mainFile
                    ? 'border-[#00D28A] bg-[#00D28A]/5'
                    : 'border-slate-700 hover:border-slate-500 bg-[#0f1420]'
              }`}
            >
              {mainFile ? (
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-[#00D28A]/20 rounded flex items-center justify-center">
                     <FileText className="w-5 h-5 text-[#00D28A]" />
                   </div>
                   <div className="text-left overflow-hidden">
                     <p className="text-white text-sm font-medium truncate max-w-[150px]">{mainFile.name}</p>
                     <p className="text-xs text-slate-500">{(mainFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                   </div>
                   <button 
                      onClick={(e) => { e.stopPropagation(); setMainFile(null); }}
                      className="p-1 hover:text-red-400 text-slate-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                 </div>
              ) : (
                <>
                  <input 
                    type="file" 
                    accept=".zip,.rar,.7z" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => e.target.files && setMainFile(e.target.files[0])}
                  />
                  <Upload className="w-8 h-8 text-slate-500 mb-3" />
                  <p className="text-sm text-slate-300 font-medium">Upload asset file</p>
                  <p className="text-xs text-slate-500 mt-1">.ZIP up to 5GB</p>
                </>
              )}
            </div>
          </div>

        </div>
      </div>

      <div className="pt-6 border-t border-slate-800 flex justify-end gap-4">
        <button 
            type="button" 
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition-colors"
        >
            Save Draft
        </button>
        <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#00D28A] hover:bg-[#00b074] text-black rounded-lg font-bold transition-all shadow-[0_0_15px_rgba(0,210,138,0.2)] hover:shadow-[0_0_25px_rgba(0,210,138,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Publishing...
              </>
            ) : (
              'Publish Asset'
            )}
        </button>
      </div>
    </form>
  );
}
