import { Badge } from '@/components/ui/Badge'

interface CareerSkillsListProps {
  skills: string[]
}

export function CareerSkillsList({ skills }: CareerSkillsListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map(skill => (
        <Badge key={skill} variant="info">{skill}</Badge>
      ))}
    </div>
  )
}
