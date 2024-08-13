"use client"
import { WORKDATA } from "@/constants/data";
import PfolioCard from "@/components/PfolioCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const page = () => {
  return (
    <section className='max-padd-container py-16 xl:py-22 bg-[#fdf3fb] dark:bg-transparent'>
      {/* title */}
      <div className="flex flex-col flexCenter">
        <span className="text-primary uppercase font-bold">Projects</span>
        <h3 className='h3 font-extrabold'>My Creations</h3>
      </div>
      {/* container */}
      <div className='flex flex-col xl:flex-row gap-16'>
        <Tabs defaultValue="front">
          <TabsList className='w-full grid grid-cols-3 max-w-[511px] border dark:border-secondary mx-auto bg-white dark:bg-transparent'>
            <TabsTrigger value='front'>FrontEnd</TabsTrigger>
            <TabsTrigger value='back'>BackEnd</TabsTrigger>
            <TabsTrigger value='full'>FullStack</TabsTrigger>
          </TabsList>
          {/* tabs content */}
          <div className="pt-12 xl:pt-3 pl-3">
            {/* frontend */}
            <TabsContent value='front'>
              <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {WORKDATA.map((project, i) => {
                  if (project.category === 'frontEnd') {
                    return <div key={i} className="flexCenter">
                      <PfolioCard
                        url={project.url}
                        title={project.title}
                        category={project.category}
                        des={project.des}
                      />
                    </div>
                  }
                })}
              </div>
            </TabsContent>
            {/* backend */}
            <TabsContent value='back'>
              <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {WORKDATA.map((project, i) => {
                  if (project.category === 'backEnd') {
                    return <div key={i} className="flexCenter">
                      <PfolioCard
                        url={project.url}
                        title={project.title}
                        category={project.category}
                        des={project.des}
                      />
                    </div>
                  }
                })}
              </div>
            </TabsContent>
            {/* fullstack */}
            <TabsContent value='full'>
              <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                {WORKDATA.map((project, i) => {
                  if (project.category === 'fullStack') {
                    return <div key={i} className="flexCenter">
                      <PfolioCard
                        url={project.url}
                        title={project.title}
                        category={project.category}
                        des={project.des}
                      />
                    </div>
                  }
                })}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  )
}

export default page;