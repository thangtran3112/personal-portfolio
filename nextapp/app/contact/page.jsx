import { Button } from "@/components/ui/button";
import { User2, MailIcon, HomeIcon, PhoneCall, MoveRight } from "lucide-react";

const page = () => {
  return (
    <section className="max-padd-container py-16 xl:py-24 bg-[#fdf3fb] dark:bg-transparent">
      <div className="flex flex-col xl:flex-row gap-12">
        {/* title */}
        <div className="flex flex-col flex-1 ">
          <span className="text-primary uppercase font-bold">Get in touch</span>
          <h3 className="h3 font-extrabold">Contact Me</h3>
          <p>
            Whether you have a project in mind, need some advice, or just want
            to chat about the latest in tech, I'd love to connect. I'm always
            excited to collaborate and explore new opportunities. Let's build
            something amazing together!
          </p>
          <div className="flex flex-col gap-y-5 mt-6 medium-15">
            <div className="flex gap-x-3">
              <span>
                <User2 size={20} />
              </span>
              :<span>Thang Tran</span>
            </div>
            <div className="flex gap-x-3">
              <span>
                <PhoneCall size={20} />
              </span>
              :<span>+1 (425) 390-2078</span>
            </div>
            <div className="flex gap-x-3">
              <span>
                <MailIcon size={20} />
              </span>
              :<span>thangtran3112@gmail.com</span>
            </div>
            <div className="flex gap-x-3">
              <span>
                <HomeIcon size={20} />
              </span>
              :<span>21417, 120 Ave SE, Kent, WA, 98031</span>
            </div>
          </div>
        </div>
        {/* container */}
        <div className="flex-[1.5]">
          <form className="flex flex-1 flex-col gap-4 w-full mx-auto max-w-[33rem]">
            <div className="flex gap-2 w-full">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="regular-14 rounded-lg px-4 py-2 dark:bg-secondary outline-none w-1/2"
              />
              <input
                type="email"
                placeholder="Enter Your Email"
                className="regular-14 rounded-lg px-4 py-2 dark:bg-secondary outline-none w-1/2"
              />
            </div>
            <input
              type="text"
              placeholder="Enter You Subject"
              className="regular-14 rounded-lg px-4 py-2 dark:bg-secondary outline-none"
            />
            <textarea
              id=""
              cols="10"
              rows="8"
              placeholder="Enter You Message"
              className="regular-14 rounded-lg px-4 py-2 dark:bg-secondary outline-none resize-none "
            ></textarea>
            <div>
              <Button className="gap-x-2 shadow-xl">
                Contact me
                <MoveRight size={20} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default page;
