// @ts-nocheck
/**
 * This file was automatically generated by @cosmwasm/ts-codegen@0.16.5.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run the @cosmwasm/ts-codegen generate command to regenerate this file.
 */

import { UseQueryOptions, useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query'
import { ExecuteResult } from '@cosmjs/cosmwasm-stargate'
import { StdFee, Coin } from '@cosmjs/amino'
import {
  InstantiateMsg,
  ExecuteMsg,
  OwnerUpdate,
  Uint128,
  Liquidate,
  QueryMsg,
  ConfigResponse,
} from './MarsLiquidationFilterer.types'
import {
  MarsLiquidationFiltererQueryClient,
  MarsLiquidationFiltererClient,
} from './MarsLiquidationFilterer.client'
export const marsLiquidationFiltererQueryKeys = {
  contract: [
    {
      contract: 'marsLiquidationFilterer',
    },
  ] as const,
  address: (contractAddress: string | undefined) =>
    [{ ...marsLiquidationFiltererQueryKeys.contract[0], address: contractAddress }] as const,
  config: (contractAddress: string | undefined, args?: Record<string, unknown>) =>
    [
      { ...marsLiquidationFiltererQueryKeys.address(contractAddress)[0], method: 'config', args },
    ] as const,
}
export interface MarsLiquidationFiltererReactQuery<TResponse, TData = TResponse> {
  client: MarsLiquidationFiltererQueryClient | undefined
  options?: Omit<
    UseQueryOptions<TResponse, Error, TData>,
    "'queryKey' | 'queryFn' | 'initialData'"
  > & {
    initialData?: undefined
  }
}
export interface MarsLiquidationFiltererConfigQuery<TData>
  extends MarsLiquidationFiltererReactQuery<ConfigResponse, TData> {}
export function useMarsLiquidationFiltererConfigQuery<TData = ConfigResponse>({
  client,
  options,
}: MarsLiquidationFiltererConfigQuery<TData>) {
  return useQuery<ConfigResponse, Error, TData>(
    marsLiquidationFiltererQueryKeys.config(client?.contractAddress),
    () => (client ? client.config() : Promise.reject(new Error('Invalid client'))),
    { ...options, enabled: !!client && (options?.enabled != undefined ? options.enabled : true) },
  )
}
export interface MarsLiquidationFiltererRefundMutation {
  client: MarsLiquidationFiltererClient
  msg: {
    recipient: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useMarsLiquidationFiltererRefundMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, MarsLiquidationFiltererRefundMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, MarsLiquidationFiltererRefundMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.refund(msg, fee, memo, funds),
    options,
  )
}
export interface MarsLiquidationFiltererLiquidateManyMutation {
  client: MarsLiquidationFiltererClient
  msg: {
    liquidations: Liquidate[]
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useMarsLiquidationFiltererLiquidateManyMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, MarsLiquidationFiltererLiquidateManyMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, MarsLiquidationFiltererLiquidateManyMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.liquidateMany(msg, fee, memo, funds),
    options,
  )
}
export interface MarsLiquidationFiltererUpdateConfigMutation {
  client: MarsLiquidationFiltererClient
  msg: {
    addressProvider?: string
  }
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useMarsLiquidationFiltererUpdateConfigMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, MarsLiquidationFiltererUpdateConfigMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, MarsLiquidationFiltererUpdateConfigMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) =>
      client.updateConfig(msg, fee, memo, funds),
    options,
  )
}
export interface MarsLiquidationFiltererUpdateOwnerMutation {
  client: MarsLiquidationFiltererClient
  msg: OwnerUpdate
  args?: {
    fee?: number | StdFee | 'auto'
    memo?: string
    funds?: Coin[]
  }
}
export function useMarsLiquidationFiltererUpdateOwnerMutation(
  options?: Omit<
    UseMutationOptions<ExecuteResult, Error, MarsLiquidationFiltererUpdateOwnerMutation>,
    'mutationFn'
  >,
) {
  return useMutation<ExecuteResult, Error, MarsLiquidationFiltererUpdateOwnerMutation>(
    ({ client, msg, args: { fee, memo, funds } = {} }) => client.updateOwner(msg, fee, memo, funds),
    options,
  )
}
