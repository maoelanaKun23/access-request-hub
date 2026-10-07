import transformers from '@kubb/core/transformers'
import {Function as KubbFunction} from '@kubb/react'
import {QueryOptions} from '@kubb/swagger-tanstack-query/components'
// biome-ignore lint/style/useImportType: <explanation>
import React from 'react'

export const templates = {
  ...QueryOptions.templates,
  react: ({
    name,
    params,
    JSDoc,
    hook,
    infinite,
    client,
    parser,
    dataReturnType,
    generics,
    returnType,
  }: React.ComponentProps<typeof QueryOptions.templates.react>) => {
    const isFormData = client.contentType === 'multipart/form-data'
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
      client.withQueryParams && !infinite ? 'params' : undefined,
      client.withData && !isFormData ? 'data' : undefined,
      client.withData && isFormData ? 'data: formData' : undefined,
      headers.length
        ? `headers: { ${headers}, ...options.headers }`
        : undefined,
      '...options',
      client.withQueryParams && !!infinite
        ? `params: {
          ...params,
          ['${infinite.queryParam}']: pageParam,
          ...(typeof options.params === 'object' && options.params !== null ? options.params : {}),
        }`
        : undefined,
    ].filter(Boolean)

    const queryOptions = [
      infinite ? `initialPageParam: ${infinite.initialPageParam}` : undefined,
      !!infinite && !!infinite.cursorParam
        ? `getNextPageParam: (lastPage) => lastPage['${infinite.cursorParam}']`
        : undefined,
      !!infinite && !!infinite.cursorParam
        ? `getPreviousPageParam: (firstPage) => firstPage['${infinite.cursorParam}']`
        : undefined,
      !!infinite && !infinite.cursorParam && dataReturnType === 'full'
        ? 'getNextPageParam: (lastPage, _allPages, lastPageParam) => !lastPage?.data.meta.hasNextPage ? undefined : lastPageParam + 1'
        : undefined,
      !!infinite && !infinite.cursorParam && dataReturnType === 'data'
        ? 'getNextPageParam: (lastPage: any, _allPages: any[], lastPageParam: number) => !lastPage?.meta.hasNextPage ? undefined : lastPageParam + 1'
        : undefined,
      !!infinite && !infinite.cursorParam
        ? 'getPreviousPageParam: (_firstPage: any, _allPages: any[], firstPageParam: number) => firstPageParam <= 1 ? undefined : firstPageParam - 1;'
        : undefined,
    ].filter(Boolean)

    const resolvedClientOptions = `${transformers.createIndent(4)}${clientOptions.join(`,\n${transformers.createIndent(4)}`)}`
    const resolvedQueryOptions = `${transformers.createIndent(4)}${queryOptions.join(`,\n${transformers.createIndent(4)}`)}`

    let returnRes = parser ? `return ${parser}(res.data)` : 'return res.data'
    if (dataReturnType === 'full') {
      returnRes = parser
        ? `return {...res, data: ${parser}(res.data)}`
        : 'return res'
    }
    const formData = isFormData
      ? `
        const formData = new FormData()
        if(data) {
        Object.keys(data).forEach(key => formData.append(key, data[key]))
        }
        `
      : undefined

    if (infinite) {
      return (
        <KubbFunction name={name} export params={params} JSDoc={JSDoc}>
          {`
            const queryKey = ${hook.queryKey}

            return infiniteQueryOptions({
                queryKey,
                queryFn: async ({ pageParam }) => {
                    ${hook.children || ''}
                    ${formData || ''}
                    const res = await client<${client.generics}>({
                        ${resolvedClientOptions}
                    })

                    ${returnRes}
                },
                ${resolvedQueryOptions}
            })
          `}
        </KubbFunction>
      )
    }

    return (
      <KubbFunction
        name={name}
        export
        generics={generics}
        returnType={returnType}
        params={params}
        JSDoc={JSDoc}
      >
        {`
           const queryKey = ${hook.queryKey}
  
           return {
             queryKey,
             queryFn: async ({ pageParam }) => {
               ${hook.children || ''}
               ${formData || ''}
               const res = await client<${client.generics}>({
                ${resolvedClientOptions}
               })
  
               ${returnRes}
             },
             ${resolvedQueryOptions}
           }
  
           `}
      </KubbFunction>
    )
  },
}
