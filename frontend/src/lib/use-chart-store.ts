import {create} from 'zustand'

interface ChartStore {
  filters: Record<string, {startDate: Date | null; endDate: Date | null}>
  selectedParameterIds: string[]
  setStartDate: (
    parameterId: string,
    componentId: string,
    date: Date | null,
  ) => void
  setEndDate: (
    parameterId: string,
    componentId: string,
    date: Date | null,
  ) => void
  setParameterId: (parameterId: string) => void
  removeParameterId: (parameterId: string) => void
}

export const useChartStore = create<ChartStore>(set => ({
  filters: {},
  selectedParameterIds: [],

  setStartDate: (parameterId, componentId, date) =>
    set(state => ({
      filters: {
        ...state.filters,
        [`${componentId}_${parameterId}`]: {
          ...(state.filters[`${componentId}_${parameterId}`] ?? {
            startDate: null,
            endDate: null,
          }),
          startDate: date,
        },
      },
    })),

  setEndDate: (parameterId, componentId, date) =>
    set(state => ({
      filters: {
        ...state.filters,
        [`${componentId}_${parameterId}`]: {
          ...(state.filters[`${componentId}_${parameterId}`] ?? {
            startDate: null,
            endDate: null,
          }),
          endDate: date,
        },
      },
    })),

  setParameterId: parameterId =>
    set(state => ({
      selectedParameterIds: [
        ...new Set([...state.selectedParameterIds, parameterId]),
      ],
    })),

  removeParameterId: parameterId =>
    set(state => ({
      selectedParameterIds: state.selectedParameterIds.filter(
        id => id !== parameterId,
      ),
    })),
}))
