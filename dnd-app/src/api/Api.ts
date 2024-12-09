/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  /** ID */
  id?: number;
  /**
   * Is staff
   * @default false
   */
  is_staff?: boolean;
  /**
   * Is superuser
   * @default false
   */
  is_superuser?: boolean;
  /**
   * Last login
   * @format date-time
   */
  last_login?: string | null;
  /**
   * Email адрес
   * @format email
   * @minLength 1
   * @maxLength 254
   */
  email?: string;
  /**
   * Пароль
   * @minLength 1
   * @maxLength 100
   */
  password?: string;
  /** @uniqueItems true */
  groups?: number[];
  /** @uniqueItems true */
  user_permissions?: number[];
}

export interface CharacterToRequest {
  /** Key */
  key?: number;
  /** Character */
  character?: string;
  /** Request */
  request?: number | null;
  /**
   * Coordinate x
   * @min -2147483648
   * @max 2147483647
   */
  coordinate_x?: number | null;
  /**
   * Coordinate y
   * @min -2147483648
   * @max 2147483647
   */
  coordinate_y?: number | null;
  /** Friendorenemy */
  friendorenemy?: boolean | null;
}

export interface Character {
  /** Character id */
  character_id: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 20
   */
  name: string;
  /**
   * Race
   * @minLength 1
   * @maxLength 20
   */
  race: string;
  /**
   * Class field
   * @minLength 1
   * @maxLength 14
   */
  class_field: string;
  /**
   * Description
   * @minLength 1
   * @maxLength 1000
   */
  description: string;
  /**
   * Features
   * @minLength 1
   * @maxLength 150
   */
  features: string;
  /**
   * Hit points
   * @min -2147483648
   * @max 2147483647
   */
  hit_points: number;
  /**
   * Armor class
   * @min -2147483648
   * @max 2147483647
   */
  armor_class: number;
  /**
   * Photo url
   * @minLength 1
   * @maxLength 100
   */
  photo_url: string;
}

export interface Characters {
  characters: Character[];
  /**
   * Characteronmapid
   * @minLength 1
   */
  CharacterOnMapID: string;
  /** Characteronmapcount */
  CharacterOnMapCount: number;
}

export interface RequestDetail {
  /** Request id */
  request_id?: number;
  /** Status */
  status?: "draft" | "deleted" | "formed" | "completed" | "rejected";
  /**
   * Creation date
   * @format date-time
   */
  creation_date?: string | null;
  /**
   * Formation date
   * @format date-time
   */
  formation_date?: string | null;
  /**
   * Completion date
   * @format date-time
   */
  completion_date?: string | null;
  /**
   * Map name
   * @minLength 1
   * @maxLength 20
   */
  map_name?: string;
  /** Creator */
  creator?: string;
  /** Moderator */
  moderator?: string;
  characters?: CharacterToRequest[];
  /**
   * Rating
   * @min -2147483648
   * @max 2147483647
   */
  rating?: number | null;
}

export interface Request {
  /** Request id */
  request_id?: number;
  /** Status */
  status?: "draft" | "deleted" | "formed" | "completed" | "rejected";
  /**
   * Creation date
   * @format date-time
   */
  creation_date?: string | null;
  /**
   * Formation date
   * @format date-time
   */
  formation_date?: string | null;
  /**
   * Completion date
   * @format date-time
   */
  completion_date?: string | null;
  /**
   * Map name
   * @minLength 1
   * @maxLength 20
   */
  map_name?: string;
  /** Creator */
  creator?: string;
  /** Moderator */
  moderator?: string;
  /**
   * Rating
   * @min -2147483648
   * @max 2147483647
   */
  rating?: number | null;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags api
     * @name ApiCharactersAddImageCreate
     * @request POST:/api/characters/{character_id}/addImage
     * @secure
     */
    apiCharactersAddImageCreate: (characterId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/characters/${characterId}/addImage`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUserList
     * @request GET:/api/user/
     * @secure
     */
    apiUserList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/api/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUserCreate
     * @request POST:/api/user/
     * @secure
     */
    apiUserCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUserLogoutCreate
     * @request POST:/api/user/logout
     * @secure
     */
    apiUserLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/user/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUserRead
     * @request GET:/api/user/{id}/
     * @secure
     */
    apiUserRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUserUpdate
     * @request PUT:/api/user/{id}/
     * @secure
     */
    apiUserUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUserPartialUpdate
     * @request PATCH:/api/user/{id}/
     * @secure
     */
    apiUserPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags api
     * @name ApiUserDelete
     * @request DELETE:/api/user/{id}/
     * @secure
     */
    apiUserDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  characterOnMap = {
    /**
     * @description Обновить данные персонажа в заявке
     *
     * @tags characterOnMap
     * @name CharacterOnMapUpdate
     * @request PUT:/characterOnMap/{request_id}/{character_id}
     * @secure
     */
    characterOnMapUpdate: (
      requestId: string,
      characterId: string,
      data: CharacterToRequest,
      params: RequestParams = {},
    ) =>
      this.request<CharacterToRequest, void>({
        path: `/characterOnMap/${requestId}/${characterId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить персонажа из заявки
     *
     * @tags characterOnMap
     * @name CharacterOnMapDelete
     * @request DELETE:/characterOnMap/{request_id}/{character_id}
     * @secure
     */
    characterOnMapDelete: (requestId: string, characterId: string, params: RequestParams = {}) =>
      this.request<CharacterToRequest[], void>({
        path: `/characterOnMap/${requestId}/${characterId}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  characters = {
    /**
     * @description Получить список всех персонажей
     *
     * @tags characters
     * @name CharactersList
     * @request GET:/characters/
     * @secure
     */
    charactersList: (
      query: {
        /** @minLength 1 */
        CharacterName: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Characters, any>({
        path: `/characters/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Создать нового персонажа
     *
     * @tags characters
     * @name AddCharacter
     * @request POST:/characters/
     * @secure
     */
    addCharacter: (data: Character, params: RequestParams = {}) =>
      this.request<Character, void>({
        path: `/characters/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить детали персонажа
     *
     * @tags characters
     * @name CharactersRead
     * @request GET:/characters/{character_id}/
     * @secure
     */
    charactersRead: (characterId: string, params: RequestParams = {}) =>
      this.request<Character, any>({
        path: `/characters/${characterId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавить персонажа в заявку
     *
     * @tags characters
     * @name AddCharacterToRequest
     * @request POST:/characters/{character_id}/
     * @secure
     */
    addCharacterToRequest: (characterId: string, params: RequestParams = {}) =>
      this.request<RequestDetail, void>({
        path: `/characters/${characterId}/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags characters
     * @name CharactersUpdate
     * @request PUT:/characters/{character_id}/
     * @secure
     */
    charactersUpdate: (characterId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/characters/${characterId}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags characters
     * @name CharactersDelete
     * @request DELETE:/characters/{character_id}/
     * @secure
     */
    charactersDelete: (characterId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/characters/${characterId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  login = {
    /**
     * No description
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  requests = {
    /**
     * @description Получить список всех заявок
     *
     * @tags requests
     * @name GetRequests
     * @request GET:/requests/
     * @secure
     */
    getRequests: (params: RequestParams = {}) =>
      this.request<Request[], any>({
        path: `/requests/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить детали заявки
     *
     * @tags requests
     * @name RequestsRead
     * @request GET:/requests/{request_id}
     * @secure
     */
    requestsRead: (requestId: string, params: RequestParams = {}) =>
      this.request<RequestDetail, any>({
        path: `/requests/${requestId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновить детали заявки
     *
     * @tags requests
     * @name RequestsUpdate
     * @request PUT:/requests/{request_id}
     * @secure
     */
    requestsUpdate: (requestId: string, data: RequestDetail, params: RequestParams = {}) =>
      this.request<RequestDetail, any>({
        path: `/requests/${requestId}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить заявку
     *
     * @tags requests
     * @name RequestsDelete
     * @request DELETE:/requests/{request_id}
     * @secure
     */
    requestsDelete: (requestId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/requests/${requestId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Сохранить заявку создателем
     *
     * @tags requests
     * @name RequestsFormUpdate
     * @request PUT:/requests/{request_id}/form
     * @secure
     */
    requestsFormUpdate: (requestId: string, data: RequestDetail, params: RequestParams = {}) =>
      this.request<RequestDetail, void>({
        path: `/requests/${requestId}/form`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags requests
     * @name RequestsModerateUpdate
     * @request PUT:/requests/{request_id}/moderate
     * @secure
     */
    requestsModerateUpdate: (requestId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/requests/${requestId}/moderate`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserList
     * @request GET:/user/
     * @secure
     */
    userList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserCreate
     * @request POST:/user/
     * @secure
     */
    userCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserRead
     * @request GET:/user/{id}/
     * @secure
     */
    userRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUpdate
     * @request PUT:/user/{id}/
     * @secure
     */
    userUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserPartialUpdate
     * @request PATCH:/user/{id}/
     * @secure
     */
    userPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserDelete
     * @request DELETE:/user/{id}/
     * @secure
     */
    userDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
