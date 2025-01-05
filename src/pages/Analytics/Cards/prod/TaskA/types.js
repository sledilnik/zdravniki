/* eslint-disable no-unused-vars */
/** @import * as z from 'zod'; */

import { dejavnostSchema, overviewSchema, overviewSchemaTransformed } from './schemas';

/**
 * @typedef {z.input<typeof overviewSchema} OverviewDataInput
 * @typedef {z.output<typeof overviewSchema>} OverviewDataOutput
 * @typedef {z.infer<typeof overviewSchema>} OverviewData
 *
 * @typedef {z.input<typeof dejavnostSchema>} Dejavnost what we get from the API as property "dejavnost" in Slovenian language
 * @typedef {z.output<typeof dejavnostSchema>} DejavnostOutput
 * @typedef {z.infer<typeof dejavnostSchema>} DejavnostType
 *
 * @typedef {z.input<typeof overviewSchemaTransformed>} OverviewDataTransformedInput
 * @typedef {z.output<typeof overviewSchemaTransformed>} OverviewDataTransformedOutput
 * @typedef {z.infer<typeof overviewSchemaTransformed>} OverviewDataTransformed
 *
 * @typedef {OverviewDataTransformedOutput["doctorType"]} DoctorType transformed "dejavnost" to camelCase in english
 * @typedef {Map<number, Map<DoctorType, OverviewDataTransformedOutput[]>>} DoctorTypeDataMap Doctor type data map key is year and doctor type value is array of data
 * @typedef {Object} UserInputsValues
 * @property {DoctorType} doctorType - The type of doctor.
 * @property {string} year - The year.
 * @property {string} municipality - The municipality.
 *
 * @typedef {OverviewDataTransformedOutput & {value: number, selected: boolean}} OverviewDataMapSeriesDataItem
 * @typedef {Exclude<keyof OverviewDataTransformedOutput, "year" | "municipality" | "doctorType">} PropertyAsValue
 * @typedef {string} Municipality
 */
