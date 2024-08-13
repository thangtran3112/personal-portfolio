"use client"
import { useState } from 'react'
import { FaLock, FaLockOpen } from 'react-icons/fa6';
import { Collapse } from "react-collapse"
import { ACCORDION } from '@/constants/data';

const Accordion = ({sliceCount}) => {

    const [open, setOpen] = useState(null);

    const toggle = (index) => {
        if (open === index) {
            return setOpen(null);
        }

        setOpen(index);
    }

    // Slice the ACCORDION data based on the sliceCount prop
    const slicedAccordion = sliceCount ? ACCORDION.slice(0, sliceCount) : ACCORDION;

    return (
        <div>
            <div className='pt-4 max-w-[800px]'>
                {slicedAccordion.slice({sliceCount}).map((item, index) => (
                    <AccordionItem
                        key={index}
                        open={index === open}
                        question={item.question}
                        answer={item.answer}
                        toggle={() => toggle(index)}
                    />
                ))}
            </div>
        </div>
    )
}

const AccordionItem = ({ open, toggle, question, answer }) => {
    return (
        <div className=''>
            <div onClick={toggle} className={'px-3 py-2 medium-16 flex items-center gap-x-4 cursor-pointer transition-all duration-300 mb-2'}>
                <div>{open ? <FaLockOpen /> : <FaLock />}</div>
                <h4>{question}</h4>
            </div>
            <div className='mb-2'>
                <Collapse isOpened={open}>
                    <p className='px-6'>{answer}</p>
                </Collapse>
            </div>
        </div>
    )
}

export default Accordion