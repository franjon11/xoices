import { ChevronDown, Folder, GripVertical, List, Star, Trash } from "lucide-react"
import MainContainer from "../components/layout/MainContainter"
import SectionContainer from "../components/layout/SectionContainer"
import FormInputElement from "../components/ui/FormInput"

const DragableQuiz = () => {
  return (
    <div className="group cursor-grab active:cursor-grabbing p-3 rounded-lg bg-white border border-transparent hover:border-sage/50 shadow-sm transition-all">
      <div className="flex justify-between items-start">
        <p className="text-sm font-semibold text-slate-800">Intro to Biology</p>
        <span className="text-neutral-400 group-hover:text-sage transition-colors text-lg"><GripVertical /></span>
      </div>
      <div className="flex items-center gap-2 mt-2 text-[10px] text-neutral-500">
        <span className="flex items-center gap-1">
          <span className="text-[12px]">
            <List size={12} strokeWidth={2.5} />
          </span> 
          12 Questions
        </span>
        <span>•</span>
        <span>Oct 12, 2023</span>
      </div>
    </div>
  )
}

const CollapsibleQuiz = () => {
  return (
    <div className="bg-white rounded-xl border border-sage/20 shadow-sm overflow-hidden">
      <div className="p-4 bg-sage/5 flex items-center justify-between border-b border-sage/10">
        <div className="flex items-center gap-3">
          <button className="flex items-center justify-center p-1 text-sage hover:bg-sage/10 rounded">
            <ChevronDown size={20} strokeWidth={2.5} />
          </button>
          <h3 className="font-bold text-slate-800">Intro to Biology</h3>
          <span className="bg-sage/20 text-sage text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">12 Questions</span>
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input checked={false} className="form-checkbox rounded border-sage/50 text-sage focus:ring-sage size-4" type="checkbox"/>
            <span className="text-xs font-bold text-sage">Select All</span>
          </label>
          <button className="text-red-400 hover:text-red-500 flex items-center justify-center">
            <Trash size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Questions List (Simulating Expanded) */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-start gap-3 p-3 bg-almond-light/30 rounded-lg border border-sage/5">
          <input className="form-checkbox mt-1 rounded border-sage/50 text-sage focus:ring-sage size-4" type="checkbox"/>
          <div className="flex-1">
            <p className="text-sm font-medium">Q1: What is the basic unit of life?</p>
            <p className="text-xs text-neutral-500 mt-1">Multiple Choice • 1 point</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-almond-light/30 rounded-lg border border-sage/5">
          <input className="form-checkbox mt-1 rounded border-sage/50 text-sage focus:ring-sage size-4" type="checkbox"/>
          <div className="flex-1">
            <p className="text-sm font-medium">Q2: Which scientist is known as the father of modern genetics?</p>
            <p className="text-xs text-neutral-500 mt-1">Multiple Choice • 1 point</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-almond-light/30 rounded-lg border border-sage/5 opacity-50">
          <input className="form-checkbox mt-1 rounded border-sage/50 text-sage focus:ring-sage size-4" type="checkbox"/>
          <div className="flex-1">
            <p className="text-sm font-medium">Q3: Define the process of osmosis.</p>
            <p className="text-xs text-neutral-500 mt-1">Short Answer • 2 points</p>
          </div>
        </div>
      </div>
    </div>
  )
}


const QuizMerge = () => {

  return (
    <MainContainer>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-6">
          {/* Title Quiz */}
          <FormInputElement
            label="Titulo"
            name="title"
            type="text"
            placeholder="Titulo del Quiz"
            className="bg-white"
            required
          />

          {/* Description Quiz */}
          <FormInputElement
            label="Descripcion"
            as="textarea"
            name="description"
            type="text"
            placeholder="Descripcion del Quiz"
            className="bg-white"
            required
          />

          {/* Quiz List */}
          <div className="flex-1 overflow-y-auto pb-32 custom-scrollbar">
            <div className="flex flex-col gap-6 max-w-4xl">
              <CollapsibleQuiz />
            </div>
          </div>
        </div>
        <aside className="lg:col-span-4 space-y-8">
          <SectionContainer className="sticky p-6 top-20" bg="white/50">
            <main className="space-y-6">
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-2 text-sage">
                  <Folder size={20} strokeWidth={2.5}  />
                  <h2 className="text-md font-black uppercase"> Mis Examenes</h2>
                </div>
                <div className="space-y-2">
                  <DragableQuiz />
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-2 text-sage">
                  <Star size={20} strokeWidth={2.5} />
                  <h2 className="text-md font-black uppercase"> Favoritos</h2>
                </div>
                <div className="space-y-2">
                  <DragableQuiz />
                  <DragableQuiz />
                </div>
              </div>
            </main>
          </SectionContainer>
        </aside>
      </div>
    </MainContainer>
  )
}

export default QuizMerge