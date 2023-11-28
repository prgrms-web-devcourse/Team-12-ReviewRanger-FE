import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { SSE } from 'sse'

const useRefine = () => {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState('')

  const resultRef = useRef<string>()

  useEffect(() => {
    resultRef.current = result
  }, [result])

  const clearState = () => {
    setPrompt('')
    setResult('')
  }

  const showAlertForEmptyPrompt = () => {
    if (prompt === '') {
      alert('빈 텍스트는 정제할 수 없습니다!')

      return true
    }

    return false
  }

  const refineConfig = {
    model: 'gpt-3.5-turbo',
    messages: [
      { content: prompt, role: 'user' },
      {
        content: `이 글들은 동료에 대한 평가 글이야. "," 로 구분된 구문들에 대해 비판이 아닌 욕설, 비난, 부정적 감정 표현을 제거한 뒤 핵심만 간략하게 요약해서 최대한 짧은 하나의 구문을 만들어줘. 또한 조건이 있어. 모든 구문을 존댓말로 통일해야 해.`,
        role: 'system',
      },
    ],
    temperature: 0.7,
    max_tokens: 1300,
    stream: true,
    n: 1,
  }

  const createSSEConfig = () => {
    return {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${import.meta.env.VITE_OPEN_API_KEY}`,
      },
      method: 'POST',
      payload: JSON.stringify(refineConfig),
    }
  }

  const handleClear = () => {
    clearState()
  }

  const handleRefine = async () => {
    if (showAlertForEmptyPrompt()) {
      return
    }

    setIsLoading(true)
    setResult('')

    const url = 'https://api.openai.com/v1/chat/completions'
    const source = new SSE(url, createSSEConfig())

    source.addEventListener('message', (e: MessageEvent) => {
      if (e.data === '[DONE]') {
        source.close()

        return
      }

      const payload = JSON.parse(e.data)
      const text = payload.choices[0].delta.content

      if (text === '\n' || text === undefined) {
        return
      }

      resultRef.current += text
      setResult(resultRef.current!)
    })

    source.addEventListener('readystatechange', () => {
      if (source.readyState === 4) {
        setIsLoading(false)
      }
    })

    source.stream()
  }

  const handleChangePrompt = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const handlers = {
    handleClear,
    handleRefine,
    handleChangePrompt,
  }

  return { prompt, result, isLoading, handlers }
}

export default useRefine
