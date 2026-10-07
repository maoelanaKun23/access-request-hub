import transformers from '@kubb/core/transformers'
import {Function as KubbFunction} from '@kubb/react'
import type {Mutation} from '@kubb/swagger-tanstack-query/components'
// biome-ignore lint/style/useImportType: <explanation>
import React from 'react'

export const templates = {
  react: ({
    name,
    params,
    mutateParams,
    JSDoc,
    client,
    hook,
    dataReturnType,
  }: React.ComponentProps<typeof Mutation.templates.react>) => {
    const headers = [
      client.contentType !== 'application/json'
        ? `'Content-Type': '${client.contentType}'`
        : undefined,
      client.withHeaders ? '...headers' : undefined,
    ]
      .filter(Boolean)
      .join(', ')

    const clientOptions = [
      `method: "${client.method}"`,
      `url: ${client.path.template}`,
      client.withQueryParams ? 'params' : undefined,
      client.withData ? 'data' : undefined,
      headers.length
        ? `headers: { ${headers}, ...clientOptions.headers }`
        : undefined,
      '...clientOptions',
    ].filter(Boolean)

    const resolvedClientOptions = `${transformers.createIndent(4)}${clientOptions.join(`,\n${transformers.createIndent(4)}`)}`

    return (
      <KubbFunction export name={name} params={params} JSDoc={JSDoc}>
        {`
         const { mutation: mutationOptions, client: clientOptions = {} } = options ?? {}

         return ${hook.name}({
           mutationFn: async(${mutateParams}) => {
             ${hook.children || ''}
             const res = await client<${client.generics}>({
              ${resolvedClientOptions}
             })

             return ${dataReturnType === 'data' ? 'res.data' : 'res'}
           },
           ...mutationOptions
         })`}
      </KubbFunction>
    )
  },
}
