import { ListChevronsDownUp, CircleFadingArrowUp, Asterisk, Award } from 'lucide-react'

export const features = [
    {
        id: 1,
        icon: ListChevronsDownUp,
        iconProps: { size: 35, color: '#344F51' },
        title: 'Write less, get more',
        description: 'Just type what you want in plain language',
    },
    {
        id: 2,
        icon: CircleFadingArrowUp,
        iconProps: { size: 35, color: '#344F51' },
        title: 'Optimized prompts',
        description: 'Input is expanded into a clear, structured, highly detailed prompt',
    },
    {
        id: 3,
        icon: Asterisk,
        iconProps: { size: 35, color: '#344F51' },
        title: 'Built on patterns',
        description: 'We enhance prompts using Google’s frameworks.',
    },
    {
        id: 4,
        icon: Award,
        iconProps: { size: 40, color: '#344F51' },
        title: 'Results You Can Trust',
        description: 'Designed to produce precise, detailed LLM outputs.',
    },
]