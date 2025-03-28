"use client";
import { motion } from "framer-motion";
import { RiReactjsLine, RiTailwindCssLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import {
  SiDocker,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiSpring,
  SiSpringboot,
  SiTensorflow,
  SiNumpy,
  SiPandas,
  SiExpress,
  SiKeras,
  SiScikitlearn,
} from "react-icons/si";
import { FaAws, FaNodeJs } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { BsFiletypeJava } from "react-icons/bs";
import { TbBrandPython } from "react-icons/tb";

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const secondIconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [-10, 10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const Tooltips = {
  nextjs: { id: "nextjs", content: "Next.js" },
  mongodb: { id: "mongodb", content: "MongoDB" },
  tensorflow: { id: "tensorflow", content: "Tensorflow" },
  aws: { id: "aws", content: "AWS" },
  nodejs: { id: "nodejs", content: "Node.js" },
  postgresql: { id: "postgresql", content: "PostgreSQL" },
  reactjs: { id: "reactjs", content: "React.js" },
  nestjs: { id: "nestjs", content: "Nest.js" },
  mysql: { id: "mysql", content: "MySQL" },
  python: { id: "python", content: "Python" },
  java: { id: "java", content: "Java" },
  spring: { id: "spring", content: "Spring" },
  tailwind: { id: "tailwind", content: "Tailwind CSS" },
  springboot: { id: "springboot", content: "Spring Boot" },
  docker: { id: "docker", content: "Docker" },
  kubernetes: { id: "kubernetes", content: "Kubernetes" },
  numpy: { id: "numpy", content: "NumPy" },
  pandas: { id: "pandas", content: "Pandas" },
  keras: { id: "keras", content: "Keras" },
  scikit: { id: "scikit", content: "Scikit-learn" },
  expressjs: { id: "expressjs", content: "ExpressJS" },
};
const FirstTechsGroup = () => {
  return (
    <motion.div
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 1.5 }}
      className="flex flex-wrap items-center justify-center gap-4"
    >
      <motion.div
        variants={iconVariants(2.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.reactjs.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.reactjs.content}
      >
        <RiReactjsLine className="text-5xl text-cyan-400" />
      </motion.div>
      <motion.div
        variants={iconVariants(3)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.nextjs.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.nextjs.content}
      >
        <TbBrandNextjs className="text-5xl" />
      </motion.div>
      <motion.div
        variants={iconVariants(6)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.nodejs.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.nodejs.content}
      >
        <FaNodeJs className="text-5xl text-fuchsia-400" />
      </motion.div>
      <motion.div
        variants={iconVariants(4)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.expressjs.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.expressjs.content}
      >
        <SiExpress className="text-5xl text-cyan-500" />
      </motion.div>
      <motion.div
        variants={iconVariants(2)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.nestjs.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.nestjs.content}
      >
        <SiNestjs className="text-5xl text-rose-500" />
      </motion.div>
      <motion.div
        variants={iconVariants(4)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.postgresql.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.postgresql.content}
      >
        <BiLogoPostgresql className="text-5xl text-sky-700" />
      </motion.div>
      <motion.div
        variants={iconVariants(3)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.mysql.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.mysql.content}
      >
        <SiMysql className="text-5xl text-purple-500" />
      </motion.div>
      <motion.div
        variants={iconVariants(5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.mongodb.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.mongodb.content}
      >
        <SiMongodb className="text-5xl text-green-500" />
      </motion.div>
      {/* Add ReactTooltip components */}
      <ReactTooltip id={Tooltips.tensorflow.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.mongodb.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.reactjs.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.postgresql.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.nextjs.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.nodejs.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.nestjs.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.mysql.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.expressjs.id} place="top" effect="solid" />
    </motion.div>
  );
};

const SecondTechsGroup = () => {
  return (
    <motion.div
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 1.5 }}
      className="flex flex-wrap items-center justify-center gap-4"
    >
      <motion.div
        variants={secondIconVariants(3.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.python.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.python.content}
      >
        <TbBrandPython className="text-5xl text-blue-500" />
      </motion.div>
      <motion.div
        variants={secondIconVariants(2.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.java.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.java.content}
      >
        <BsFiletypeJava className="text-5xl text-fuchsia-500" />
      </motion.div>
      <motion.div
        variants={secondIconVariants(3)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.spring.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.spring.content}
      >
        <SiSpring className="text-5xl text-green-500" />
      </motion.div>
      <motion.div
        variants={secondIconVariants(2)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.tailwind.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.tailwind.content}
      >
        <RiTailwindCssLine className="text-5xl text-cyan-500" />
      </motion.div>
      <motion.div
        variants={secondIconVariants(5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.springboot.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.springboot.content}
      >
        <SiSpringboot className="text-5xl text-white-500" />
      </motion.div>
      <motion.div
        variants={secondIconVariants(6)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.docker.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.docker.content}
      >
        <SiDocker className="text-5xl text-pink-500" />
      </motion.div>
      <motion.div
        variants={secondIconVariants(4)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.kubernetes.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.kubernetes.content}
      >
        <SiKubernetes className="text-5xl text-sky-400" />
      </motion.div>
      <motion.div
        variants={iconVariants(5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.aws.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.aws.content}
      >
        <FaAws className="text-5xl text-amber-500" />
      </motion.div>
      {/* Add ReactTooltip components */}
      <ReactTooltip id={Tooltips.python.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.java.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.spring.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.tailwind.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.springboot.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.docker.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.kubernetes.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.aws.id} place="top" effect="solid" />
    </motion.div>
  );
};

const ThirdTechsGroup = () => {
  return (
    <motion.div
      whileInView={{ opacity: 1, x: 0 }}
      initial={{ opacity: 0, x: -100 }}
      transition={{ duration: 1.5 }}
      className="flex flex-wrap items-center justify-center gap-4"
    >
      <motion.div
        variants={secondIconVariants(3.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.numpy.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.numpy.content}
      >
        <SiNumpy className="text-5xl text-green-500" />
      </motion.div>
      <motion.div
        variants={secondIconVariants(5.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.pandas.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.pandas.content}
      >
        <SiPandas className="text-5xl text-slate-300" />
      </motion.div>
      <motion.div
        variants={iconVariants(4.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.tensorflow.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.tensorflow.content}
      >
        <SiTensorflow className="text-5xl text-pink-500" />
      </motion.div>
      <motion.div
        variants={iconVariants(2.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.keras.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.keras.content}
      >
        <SiKeras className="text-5xl text-red-500" />
      </motion.div>
      <motion.div
        variants={iconVariants(3.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.scikit.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.scikit.content}
      >
        <SiScikitlearn className="text-5xl text-orange-500" />
      </motion.div>
      {/* Add ReactTooltip components */}
      <ReactTooltip id={Tooltips.numpy.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.pandas.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.tensorflow.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.keras.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.scikit.id} place="top" effect="solid" />
    </motion.div>
  );
};

const Technologies = () => {
  return (
    <div className="border-b border-neutral-800 pb-24">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl"
      >
        Technologies
      </motion.h2>
      <div className="flex flex-col flex-wrap justify-center gap-8">
        <SecondTechsGroup />
        <FirstTechsGroup />
        <ThirdTechsGroup />
      </div>
    </div>
  );
};

export default Technologies;
