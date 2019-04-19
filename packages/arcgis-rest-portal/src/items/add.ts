/* Copyright (c) 2018 Environmental Systems Research Institute, Inc.
 * Apache-2.0 */

import { request, appendCustomParams } from "@esri/arcgis-rest-request";

import { getPortalUrl } from "../util/get-portal-url";
import {
  IUserItemOptions,
  IItemResourceOptions,
  IUpdateItemResponse,
  IItemResourceResponse,
  determineOwner,
  IManageItemRelationshipOptions
} from "./helpers";

export interface IAddItemDataOptions extends IUserItemOptions {
  /**
   * Object to store
   */
  data: any;
}

/**
 * ```js
 * import { addItemJsonData } from "@esri/arcgis-rest-portal";
 * //
 * addItemJsonData({
 *   id: '3ef',
 *   data: {}
 *   authentication
 * })
 *   .then(response)
 * ```
 * Send json to an item to be stored as the `/data` resource. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-item.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with an object reporting
 *        success/failure and echoing the item id.
 */
export function addItemJsonData(
  requestOptions: IAddItemDataOptions
): Promise<IUpdateItemResponse> {
  const owner = determineOwner(requestOptions);
  const url = `${getPortalUrl(requestOptions)}/content/users/${owner}/items/${
    requestOptions.id
  }/update`;

  // Portal API requires that the 'data' be stringified and POSTed in
  // a `text` form field. It can also be sent with the `.create` call by sending
  // a `.data` property.
  requestOptions.params = {
    text: requestOptions.data,
    ...requestOptions.params
  };

  return request(url, requestOptions);
}

/**
 * ```js
 * import { addItemData } from "@esri/arcgis-rest-portal";
 * //
 * addItemData({
 *   id: '3ef',
 *   data: file,
 *   authentication
 * })
 *   .then(response)
 * ```
 * Send a file or blob to an item to be stored as the `/data` resource. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/update-item.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise that will resolve with an object reporting
 *        success/failure and echoing the item id.
 */
export function addItemData(
  requestOptions: IAddItemDataOptions
): Promise<IUpdateItemResponse> {
  const owner = determineOwner(requestOptions);

  const url = `${getPortalUrl(requestOptions)}/content/users/${owner}/items/${
    requestOptions.id
  }/update`;

  // Portal API requires that the 'data' be POSTed in a `file` form field.
  requestOptions.params = {
    file: requestOptions.data,
    ...requestOptions.params
  };

  return request(url, requestOptions);
}

/**
 * ```js
 * import { addItemRelationship } from "@esri/arcgis-rest-portal";
 * //
 * addItemRelationship({
 *   originItemId: '3ef',
 *   destinationItemId: 'ae7',
 *   relationshipType: 'Service2Layer',
 *   authentication
 * })
 *   .then(response)
 * ```
 * Add a relationship between two items. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-relationship.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to add item resources.
 */
export function addItemRelationship(
  requestOptions: IManageItemRelationshipOptions
): Promise<{ success: boolean }> {
  const owner = determineOwner(requestOptions);
  const url = `${getPortalUrl(
    requestOptions
  )}/content/users/${owner}/addRelationship`;

  const options = appendCustomParams<IManageItemRelationshipOptions>(
    requestOptions,
    ["originItemId", "destinationItemId", "relationshipType"],
    { params: { ...requestOptions.params } }
  );

  return request(url, options);
}

/**
 * ```js
 * import { addItemResource } from "@esri/arcgis-rest-portal";
 *
 * // Add a file resource
 * addItemResource({
 *   id: '3ef',
 *   resource: file,
 *   name: 'bigkahuna.jpg',
 *   authentication
 * })
 *   .then(response)
 *
 * // Add a text resource
 * addItemResource({
 *   id: '4fg',
 *   content: "Text content",
 *   name: 'bigkahuna.txt',
 *   authentication
 * })
 *   .then(response)
 * ```
 * Add a resource associated with an item. See the [REST Documentation](https://developers.arcgis.com/rest/users-groups-and-items/add-resources.htm) for more information.
 *
 * @param requestOptions - Options for the request
 * @returns A Promise to add item resources.
 */
export function addItemResource(
  requestOptions: IItemResourceOptions
): Promise<IItemResourceResponse> {
  const owner = determineOwner(requestOptions);
  const url = `${getPortalUrl(requestOptions)}/content/users/${owner}/items/${
    requestOptions.id
  }/addResources`;

  requestOptions.params = {
    file: requestOptions.resource,
    fileName: requestOptions.name,
    text: requestOptions.content,
    access: requestOptions.private ? "private" : "inherit",
    ...requestOptions.params
  };

  return request(url, requestOptions);
}
