import NextImage, {
  ImageLoaderProps,
  ImageProps as NextImageProps,
} from 'next/image'
import { useCallback } from 'react'

export enum AspectRatioTypes {
  '1:1' = '1:1',
  '3:2' = '3:2',
  '4:3' = '4:3',
  '9:12' = '9:12',
  '16:9' = '16:9',
}

export type AspectRatio = '16:9' | '4:3' | '1:1' | '3:2' | '9:12'

const aspectRatioToRatio = {
  [AspectRatioTypes['1:1']]: 1,
  [AspectRatioTypes['3:2']]: 2 / 3,
  [AspectRatioTypes['4:3']]: 3 / 4,
  [AspectRatioTypes['9:12']]: 12 / 9,
  [AspectRatioTypes['16:9']]: 9 / 16,
}

function calcAspecRatio(aspectRatio: AspectRatioTypes, width: number): number {
  const ratio: number = aspectRatioToRatio[aspectRatio]

  return Math.floor(width * ratio)
}

export enum LayoutTypes {
  FILL = 'fill',
  FIXED = 'fixed',
  INTRINSIC = 'intrinsic',
  RESPONSIVE = 'responsive',
}

// Next.js sadly don't export it
export type ImageLayout = 'fill' | 'fixed' | 'intrinsic' | 'responsive'

export enum FitTypes {
  PAD = 'pad',
  FILL = 'fill',
  SCALE = 'scale',
  CROP = 'crop',
  THUMB = 'thumb',
}

export type ImageFit = 'pad' | 'fill' | 'scale' | 'crop' | 'thumb'

type DistributiveOmit<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never

type ImageProps = {
  width: number
  height?: never
  layout: ImageLayout
  aspectRatio: AspectRatioTypes
  fit?: ImageFit
} & DistributiveOmit<NextImageProps, 'height'>

function Image({
  width,
  fit = FitTypes.FILL,
  aspectRatio,
  ...nextImageProps
}: ImageProps) {
  const height = calcAspecRatio(aspectRatio, width)

  const loader = useCallback(
    (loaderProps: ImageLoaderProps) => {
      const loaderHeight = calcAspecRatio(aspectRatio, loaderProps.width)

      return `${loaderProps.src}?w=${loaderProps.width}&h=${loaderHeight}&fit=${fit}`
    },
    [aspectRatio, fit]
  )

  return (
    <NextImage
      {...nextImageProps}
      width={width}
      height={height}
      loader={loader}
    />
  )
}

export default Image
