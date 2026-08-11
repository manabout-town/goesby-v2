'use client'

import { useState } from 'react'
import PhotoPanel from './PhotoPanel'

// TEMP: Task 7 verification wrapper. Holds selection state locally until a
// real workspace page (later task) owns it.
export default function PhotoPanelDemo({ sessionId }: { sessionId: string }) {
  const [selected, setSelected] = useState<string[]>([])
  return <PhotoPanel sessionId={sessionId} selected={selected} onSelectedChange={setSelected} />
}
