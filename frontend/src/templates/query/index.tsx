import {Function as KubbFunction} from '@kubb/react'
import {Query} from '@kubb/swagger-tanstack-query/components'
// biome-ignore lint/style/useImportType: <explanation>
import React from 'react'

export const templates = {
  ...Query.templates,
  react: ({
    name,
    params,
    generics,
    returnType,
    JSDoc,
    hook,
    infinite,
  }: React.ComponentProps<typeof Query.templates.react>) => {
    const resolvedReturnType = `${returnType} & {queryKey: TQueryKey}`

    return (
      <>
        <KubbFunction
          name={name}
          export
          generics={generics}
          returnType={resolvedReturnType}
          params={params}
          JSDoc={JSDoc}
        >
          {`
            const { query: queryOptions, client: clientOptions = {} } = options ?? {}
            const queryKey = queryOptions?.queryKey ?? ${hook.queryKey}

            const query = ${hook.name}({
              ...${hook.queryOptions} as unknown as ${infinite ? 'InfiniteQueryObserverOptions' : 'QueryObserverOptions'}
              queryKey,
              ...queryOptions as unknown as ${infinite ? 'Omit<InfiniteQueryObserverOptions, "queryKey">' : 'Omit<QueryObserverOptions, "queryKey">'}
            }) as ${resolvedReturnType}

            query.queryKey = queryKey as TQueryKey

            return query
          `}
        </KubbFunction>
      </>
    )
  },
} as const
