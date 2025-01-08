/** @import * as z from 'zod'; */
/** @import Highmaps from 'highcharts/highmaps'; */
/** @import * as Schemas from './schemas'; */

/**
 * @typedef {string} Municipality
 * @typedef {number} Year
 * @typedef {number} AgeGroup
 *
 * @typedef {z.input<typeof Schemas.dataSchema} OverviewDataInput
 * @typedef {z.output<typeof Schemas.dataSchema>} OverviewDataOutput
 * @typedef {z.infer<typeof Schemas.dataSchema>} OverviewData
 *
 * @typedef {z.input<typeof Schemas.dejavnostSchema>} Dejavnost what we get from the API as property "dejavnost" in Slovenian language
 * @typedef {z.output<typeof Schemas.dejavnostSchema>} DejavnostOutput
 * @typedef {z.infer<typeof Schemas.dejavnostSchema>} DejavnostType
 *
 * @typedef {z.input<typeof Schemas.overviewSchemaTransformed>} OverviewDataTransformedInput
 * @typedef {z.output<typeof Schemas.overviewSchemaTransformed>} OverviewDataTransformedOutput
 * @typedef {z.infer<typeof Schemas.overviewSchemaTransformed>} OverviewDataTransformed
 *
 * @typedef {z.input<typeof Schemas.detailSchemaTransformed>} DetailDataTransformedInput
 * @typedef {z.output<typeof Schemas.detailSchemaTransformed>} DetailDataTransformedOutput
 * @typedef {z.infer<typeof Schemas.detailSchemaTransformed>} DetailDataTransformed
 *
 * @typedef {OverviewDataTransformedOutput["doctorType"]} DoctorType transformed "dejavnost" to camelCase in english
 *
 * @typedef {Object} UserInputsValues
 * @property {DoctorType} doctorType - The type of doctor.
 * @property {string} year - The year.
 * @property {string[]} municipalities - The municipalities.
 *
 * @typedef {Object} CustomHighmapSeriesDataOption
 * @property {number} value - The value of the series data item.
 * @property {boolean} selected - Whether the series data item is selected.
 *
 * @typedef {OverviewDataTransformedOutput & CustomHighmapSeriesDataOption} OverviewDataMapSeriesDataItem
 * @typedef {Exclude<keyof OverviewDataTransformedOutput, "year" | "municipality" | "doctorType">} PropertyAsValue
 * @typedef {DetailDataTransformedOutput & {x: number, y: number}} DetailDataMapSeriesDataItem
 */

/**
 * Represents a map of doctor type overview data, organized by year and doctor type.
 * The key is the year (Year), and the value is a nested map where:
 * - The key is the doctor type (DoctorType).
 * - The value is an array of overview data transformed outputs (OverviewDataTransformedOutput[]).
 *
 * This structure is used to efficiently query doctor data by year and type.
 *
 * @typedef {Map<Year, Map<DoctorType, OverviewDataTransformedOutput[]>>} OverviewByYearAndTypeMap
 */

/**
 * Represents a map of doctor type detail data, organized by municipality, doctor type and age group.
 * The key is the municipality (string), and the value is a nested map where:
 * - The key is the doctor type (DoctorType).
 * - The value is a nested map where:
 *  - The key is the age group (AgeGroup).
 * - The value is an array of detail data transformed outputs (DetailDataTransformedOutput[]).
 *
 * This structure is used to efficiently query detail data by municipality, doctor type and age group.
 *
 * @typedef {Map<Municipality, Map<DoctorType, Map<AgeGroup, DetailDataTransformedOutput[]>>>} DetailByMunicipalityAndTypeAndAgeGroupMap
 */

export default {};
