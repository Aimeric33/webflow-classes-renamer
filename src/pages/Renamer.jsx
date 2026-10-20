import Header from "../components/sections/Header";
import Eyebrow from "../components/ui/Eyebrow";
import ClassRenamer from "../features/class-renamer";

export default function Renamer() {
    return (
      <>
        <Header />
        <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <section className="pt-22">
            <div className="mb-6"></div>
            <Eyebrow dotColor="bg-white">Webflow Classes Renamer</Eyebrow>
            <div className="mb-4"></div>
            <div className="flex justify-between">
              <h1 className="max-w-lg">Paste. Rename Classes. Copy back in Webflow.</h1>
              <p className="max-w-md">Paste any Webflow element, rename every class in one place, and copy it back to the Designer. No more clicking through the Style panel one class at a time.</p>
            </div>
            <div className="w-full h-px bg-[rgba(255,255,255,0.3)]"></div>
            <div className="mb-14"></div>
          </section>
          <ClassRenamer />
        </main>
      </>
    )
  }