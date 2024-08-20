"use client";
import { RiReactjsLine, RiTailwindCssLine } from "react-icons/ri";
import { TbBrandMongodb, TbBrandNextjs } from "react-icons/tb";
import {
  SiDocker,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiSpring,
  SiSpringboot,
} from "react-icons/si";
import { DiMongodb, DiRedis } from "react-icons/di";
import { FaAws, FaNodeJs } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { motion } from "framer-motion";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { BsFiletypeJava } from "react-icons/bs";

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
  redis: { id: "redis", content: "Redis" },
  aws: { id: "aws", content: "AWS" },
  nodejs: { id: "nodejs", content: "Node.js" },
  postgresql: { id: "postgresql", content: "PostgreSQL" },
  reactjs: { id: "reactjs", content: "React.js" },
  nestjs: { id: "nestjs", content: "Nest.js" },
  mysql: { id: "mysql", content: "MySQL" },
  java: { id: "java", content: "Java" },
  spring: { id: "spring", content: "Spring" },
  tailwind: { id: "tailwind", content: "Tailwind CSS" },
  springboot: { id: "springboot", content: "Spring Boot" },
  docker: { id: "docker", content: "Docker" },
  kubernetes: { id: "kubernetes", content: "Kubernetes" },
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
        <RiReactjsLine className="text-4xl text-cyan-400" />
      </motion.div>
      <motion.div
        variants={iconVariants(3)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.nextjs.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.nextjs.content}
      >
        <TbBrandNextjs className="text-4xl" />
      </motion.div>
      <motion.div
        variants={iconVariants(5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.aws.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.aws.content}
      >
        <FaAws className="text-4xl text-amber-500" />
      </motion.div>
      <motion.div
        variants={iconVariants(6)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.nodejs.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.nodejs.content}
      >
        <FaNodeJs className="text-4xl text-fuchsia-400" />
      </motion.div>
      <motion.div
        variants={iconVariants(4)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.postgresql.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.postgresql.content}
      >
        <BiLogoPostgresql className="text-4xl text-sky-700" />
      </motion.div>
      <motion.div
        variants={iconVariants(2)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.nestjs.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.nestjs.content}
      >
        <SiNestjs className="text-4xl text-rose-500" />
      </motion.div>
      <motion.div
        variants={iconVariants(3)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.mysql.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.mysql.content}
      >
        <SiMysql className="text-4xl text-purple-500" />
      </motion.div>
      <motion.div
        variants={iconVariants(5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.mongodb.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.mongodb.content}
      >
        <SiMongodb className="text-4xl text-green-500" />
      </motion.div>
      {/* Add ReactTooltip components */}
      <ReactTooltip id={Tooltips.nextjs.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.aws.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.mongodb.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.reactjs.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.postgresql.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.nextjs.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.nodejs.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.nestjs.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.mysql.id} place="top" effect="solid" />
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
        variants={secondIconVariants(2.5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.java.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.java.content}
      >
        <BsFiletypeJava className="text-4xl text-fuchsia-500" />
      </motion.div>
      <motion.div
        variants={secondIconVariants(3)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.spring.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.spring.content}
      >
        <SiSpring className="text-4xl text-green-500" />
      </motion.div>
      <motion.div
        variants={secondIconVariants(2)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.tailwind.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.tailwind.content}
      >
        <RiTailwindCssLine className="text-4xl text-cyan-500" />
      </motion.div>
      <motion.div
        variants={secondIconVariants(5)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.springboot.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.springboot.content}
      >
        <SiSpringboot className="text-4xl text-white-500" />
      </motion.div>
      <motion.div
        variants={secondIconVariants(6)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.docker.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.docker.content}
      >
        <SiDocker className="text-4xl text-pink-500" />
      </motion.div>
      <motion.div
        variants={secondIconVariants(4)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.kubernetes.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.kubernetes.content}
      >
        <SiKubernetes className="text-4xl text-sky-400" />
      </motion.div>
      <motion.div
        variants={iconVariants(2)}
        initial="initial"
        animate="animate"
        className="rounded-2xl border-4 border-neutral-800 p-4"
        data-tooltip-id={Tooltips.redis.id} // Set the id for the tooltip
        data-tooltip-content={Tooltips.redis.content}
      >
        <DiRedis className="text-4xl text-red-700" />
      </motion.div>
      {/* Add ReactTooltip components */}
      <ReactTooltip id={Tooltips.java.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.spring.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.tailwind.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.springboot.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.docker.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.kubernetes.id} place="top" effect="solid" />
      <ReactTooltip id={Tooltips.redis.id} place="top" effect="solid" />
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
        <FirstTechsGroup />
        <SecondTechsGroup />
      </div>
    </div>
  );
};

export default Technologies;
