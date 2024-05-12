import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    avatar: Attribute.Media;
    dipendente: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::dipendente.dipendente'
    >;
    utente: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::utente.utente'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAccessorioAccessorio extends Schema.CollectionType {
  collectionName: 'accessori';
  info: {
    singularName: 'accessorio';
    pluralName: 'accessori';
    displayName: 'Accessorio';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required;
    foto: Attribute.Media;
    bordature: Attribute.Relation<
      'api::accessorio.accessorio',
      'manyToMany',
      'api::bordatura.bordatura'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::accessorio.accessorio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::accessorio.accessorio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAziendaAzienda extends Schema.CollectionType {
  collectionName: 'aziende';
  info: {
    singularName: 'azienda';
    pluralName: 'aziende';
    displayName: 'Azienda';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    indirizzoFatturazione: Attribute.Component<'utente.indirizzo'>;
    commissioni: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
          max: 100;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    logo: Attribute.Media;
    ico: Attribute.Media;
    metodoPagamentoPreferito: Attribute.Relation<
      'api::azienda.azienda',
      'oneToOne',
      'api::metodo-pagamento.metodo-pagamento'
    >;
    dipendenti: Attribute.Relation<
      'api::azienda.azienda',
      'oneToMany',
      'api::dipendente.dipendente'
    >;
    denominazione: Attribute.String & Attribute.Required & Attribute.Unique;
    utenti: Attribute.Relation<
      'api::azienda.azienda',
      'oneToMany',
      'api::utente.utente'
    >;
    partitaIva: Attribute.String & Attribute.Unique;
    codiceFiscale: Attribute.String;
    codiceDestinatario: Attribute.String;
    pec: Attribute.Email;
    bancaPreferita: Attribute.Relation<
      'api::azienda.azienda',
      'oneToOne',
      'api::banca.banca'
    >;
    sequenzeNumeriche: Attribute.Relation<
      'api::azienda.azienda',
      'oneToMany',
      'api::sequenza-numerica.sequenza-numerica'
    >;
    banche: Attribute.Relation<
      'api::azienda.azienda',
      'oneToMany',
      'api::banca.banca'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::azienda.azienda',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::azienda.azienda',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBancaBanca extends Schema.CollectionType {
  collectionName: 'banche';
  info: {
    singularName: 'banca';
    pluralName: 'banche';
    displayName: 'Banca';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required;
    iban: Attribute.String & Attribute.Required & Attribute.Unique;
    metodiPagamento: Attribute.Relation<
      'api::banca.banca',
      'manyToMany',
      'api::metodo-pagamento.metodo-pagamento'
    >;
    azienda: Attribute.Relation<
      'api::banca.banca',
      'manyToOne',
      'api::azienda.azienda'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::banca.banca',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::banca.banca',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBordaturaBordatura extends Schema.CollectionType {
  collectionName: 'bordature';
  info: {
    singularName: 'bordatura';
    pluralName: 'bordature';
    displayName: 'Bordatura';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required;
    foto: Attribute.Media;
    tessuti: Attribute.Relation<
      'api::bordatura.bordatura',
      'manyToMany',
      'api::tessuto.tessuto'
    >;
    accessori: Attribute.Relation<
      'api::bordatura.bordatura',
      'manyToMany',
      'api::accessorio.accessorio'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bordatura.bordatura',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bordatura.bordatura',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDipendenteDipendente extends Schema.CollectionType {
  collectionName: 'dipendenti';
  info: {
    singularName: 'dipendente';
    pluralName: 'dipendenti';
    displayName: 'Dipendente';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required;
    cognome: Attribute.String;
    login: Attribute.Relation<
      'api::dipendente.dipendente',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    azienda: Attribute.Relation<
      'api::dipendente.dipendente',
      'manyToOne',
      'api::azienda.azienda'
    >;
    rappresentante: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    clienti: Attribute.Relation<
      'api::dipendente.dipendente',
      'oneToMany',
      'api::utente.utente'
    >;
    settori: Attribute.Relation<
      'api::dipendente.dipendente',
      'manyToMany',
      'api::settore.settore'
    >;
    codiceFiscale: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::dipendente.dipendente',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::dipendente.dipendente',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDocumentoTrasportoDocumentoTrasporto
  extends Schema.CollectionType {
  collectionName: 'documenti_trasporto';
  info: {
    singularName: 'documento-trasporto';
    pluralName: 'documenti-trasporto';
    displayName: 'DocumentoTrasporto';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    utente: Attribute.Relation<
      'api::documento-trasporto.documento-trasporto',
      'manyToOne',
      'api::utente.utente'
    >;
    dati: Attribute.Component<'documento.documento'> & Attribute.Required;
    dataTrasporto: Attribute.Date;
    causale: Attribute.Enumeration<['Vendita', 'Reso Lavorato']>;
    porto: Attribute.Enumeration<
      ['Franco', 'Franco con addebito in fattura', 'Assegnato']
    >;
    vettore: Attribute.Enumeration<
      [
        'Mittente',
        'Destinatario',
        'Vettore GLS',
        'Vettore BRT',
        'Vettore DHL',
        'Vettore TNT',
        'Vettore SDA',
        'Vettore FedEx',
        'Vettore'
      ]
    >;
    ordineCliente: Attribute.Relation<
      'api::documento-trasporto.documento-trasporto',
      'manyToOne',
      'api::ordine-cliente.ordine-cliente'
    >;
    linee: Attribute.Relation<
      'api::documento-trasporto.documento-trasporto',
      'oneToMany',
      'api::documento-trasporto-linea.documento-trasporto-linea'
    >;
    preventivo: Attribute.Relation<
      'api::documento-trasporto.documento-trasporto',
      'manyToOne',
      'api::preventivo.preventivo'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::documento-trasporto.documento-trasporto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::documento-trasporto.documento-trasporto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDocumentoTrasportoLineaDocumentoTrasportoLinea
  extends Schema.CollectionType {
  collectionName: 'documento_trasporto_linee';
  info: {
    singularName: 'documento-trasporto-linea';
    pluralName: 'documento-trasporto-linee';
    displayName: 'DocumentoTrasportoLinea';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    documentoTrasporto: Attribute.Relation<
      'api::documento-trasporto-linea.documento-trasporto-linea',
      'manyToOne',
      'api::documento-trasporto.documento-trasporto'
    >;
    dati: Attribute.Component<'documento.linea'> & Attribute.Required;
    personalizzazione: Attribute.Component<'pers.personalizzazione'>;
    lavorazione: Attribute.Relation<
      'api::documento-trasporto-linea.documento-trasporto-linea',
      'oneToOne',
      'api::lavorazione.lavorazione'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::documento-trasporto-linea.documento-trasporto-linea',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::documento-trasporto-linea.documento-trasporto-linea',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFinituraDefaultFinituraDefault
  extends Schema.CollectionType {
  collectionName: 'finiture_default';
  info: {
    singularName: 'finitura-default';
    pluralName: 'finiture-default';
    displayName: 'FinituraDefault';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required;
    prodotti: Attribute.Relation<
      'api::finitura-default.finitura-default',
      'manyToMany',
      'api::prodotto.prodotto'
    >;
    finitureLato: Attribute.Component<'pers.finitura-lato', true> &
      Attribute.SetMinMax<
        {
          max: 4;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::finitura-default.finitura-default',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::finitura-default.finitura-default',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiIvaIva extends Schema.CollectionType {
  collectionName: 'ive';
  info: {
    singularName: 'iva';
    pluralName: 'ive';
    displayName: 'Iva';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required & Attribute.Unique;
    descrizione: Attribute.Text;
    valore: Attribute.Float & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::iva.iva', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::iva.iva', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiLavorazioneLavorazione extends Schema.CollectionType {
  collectionName: 'lavorazioni';
  info: {
    singularName: 'lavorazione';
    pluralName: 'lavorazioni';
    displayName: 'Lavorazione';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    preventivoLinea: Attribute.Relation<
      'api::lavorazione.lavorazione',
      'oneToOne',
      'api::preventivo-linea.preventivo-linea'
    >;
    settoreCorrente: Attribute.Relation<
      'api::lavorazione.lavorazione',
      'manyToOne',
      'api::settore.settore'
    >;
    avanzamento: Attribute.JSON;
    ordineClienteLinea: Attribute.Relation<
      'api::lavorazione.lavorazione',
      'oneToOne',
      'api::ordine-cliente-linea.ordine-cliente-linea'
    >;
    documentoTrasportoLinea: Attribute.Relation<
      'api::lavorazione.lavorazione',
      'oneToOne',
      'api::documento-trasporto-linea.documento-trasporto-linea'
    >;
    statoSettore: Attribute.Relation<
      'api::lavorazione.lavorazione',
      'oneToOne',
      'api::stato-settore.stato-settore'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::lavorazione.lavorazione',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::lavorazione.lavorazione',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiListinoListino extends Schema.CollectionType {
  collectionName: 'listini';
  info: {
    singularName: 'listino';
    pluralName: 'listini';
    displayName: 'Listino';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required;
    descrizione: Attribute.Text;
    ricarico: Attribute.Integer;
    utenti: Attribute.Relation<
      'api::listino.listino',
      'oneToMany',
      'api::utente.utente'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::listino.listino',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::listino.listino',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMetodoPagamentoMetodoPagamento
  extends Schema.CollectionType {
  collectionName: 'metodi_pagamento';
  info: {
    singularName: 'metodo-pagamento';
    pluralName: 'metodi-pagamento';
    displayName: 'MetodoPagamento';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required & Attribute.Unique;
    tipoPagamento: Attribute.Enumeration<
      ['Bonifico', 'RiBa', 'Contante', 'Assegno', 'PayPal', 'Amazon']
    >;
    scadenze: Attribute.Component<'pagamento.scadenza', true> &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    spostaScadenzeFerie: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    giorniPosticipoFineMese: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 0;
          max: 31;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    banche: Attribute.Relation<
      'api::metodo-pagamento.metodo-pagamento',
      'manyToMany',
      'api::banca.banca'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::metodo-pagamento.metodo-pagamento',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::metodo-pagamento.metodo-pagamento',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrdineClienteOrdineCliente extends Schema.CollectionType {
  collectionName: 'ordini_cliente';
  info: {
    singularName: 'ordine-cliente';
    pluralName: 'ordini-cliente';
    displayName: 'OrdineCliente';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    dati: Attribute.Component<'documento.documento'>;
    dataSpedizione: Attribute.Date;
    utente: Attribute.Relation<
      'api::ordine-cliente.ordine-cliente',
      'manyToOne',
      'api::utente.utente'
    >;
    documentiTrasporto: Attribute.Relation<
      'api::ordine-cliente.ordine-cliente',
      'oneToMany',
      'api::documento-trasporto.documento-trasporto'
    >;
    linee: Attribute.Relation<
      'api::ordine-cliente.ordine-cliente',
      'oneToMany',
      'api::ordine-cliente-linea.ordine-cliente-linea'
    >;
    preventivo: Attribute.Relation<
      'api::ordine-cliente.ordine-cliente',
      'oneToOne',
      'api::preventivo.preventivo'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ordine-cliente.ordine-cliente',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ordine-cliente.ordine-cliente',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOrdineClienteLineaOrdineClienteLinea
  extends Schema.CollectionType {
  collectionName: 'ordine_cliente_linee';
  info: {
    singularName: 'ordine-cliente-linea';
    pluralName: 'ordine-cliente-linee';
    displayName: 'OrdineClienteLinea';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    ordineCliente: Attribute.Relation<
      'api::ordine-cliente-linea.ordine-cliente-linea',
      'manyToOne',
      'api::ordine-cliente.ordine-cliente'
    >;
    dati: Attribute.Component<'documento.linea'> & Attribute.Required;
    personalizzazione: Attribute.Component<'pers.personalizzazione'>;
    lavorazione: Attribute.Relation<
      'api::ordine-cliente-linea.ordine-cliente-linea',
      'oneToOne',
      'api::lavorazione.lavorazione'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ordine-cliente-linea.ordine-cliente-linea',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ordine-cliente-linea.ordine-cliente-linea',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPreventivoPreventivo extends Schema.CollectionType {
  collectionName: 'preventivi';
  info: {
    singularName: 'preventivo';
    pluralName: 'preventivi';
    displayName: 'Preventivo';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    giorniProduzioneForzato: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    dati: Attribute.Component<'documento.documento'> & Attribute.Required;
    linee: Attribute.Relation<
      'api::preventivo.preventivo',
      'oneToMany',
      'api::preventivo-linea.preventivo-linea'
    >;
    dataSpedizione: Attribute.Date;
    dataLimiteConferma: Attribute.DateTime;
    preventivoSuccessivo: Attribute.Relation<
      'api::preventivo.preventivo',
      'manyToMany',
      'api::preventivo.preventivo'
    >;
    preventivoPrecedente: Attribute.Relation<
      'api::preventivo.preventivo',
      'manyToMany',
      'api::preventivo.preventivo'
    >;
    utente: Attribute.Relation<
      'api::preventivo.preventivo',
      'manyToOne',
      'api::utente.utente'
    >;
    documentiTrasporto: Attribute.Relation<
      'api::preventivo.preventivo',
      'oneToMany',
      'api::documento-trasporto.documento-trasporto'
    >;
    ordineCliente: Attribute.Relation<
      'api::preventivo.preventivo',
      'oneToOne',
      'api::ordine-cliente.ordine-cliente'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::preventivo.preventivo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::preventivo.preventivo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPreventivoLineaPreventivoLinea
  extends Schema.CollectionType {
  collectionName: 'preventivo_linee';
  info: {
    singularName: 'preventivo-linea';
    pluralName: 'preventivo-linee';
    displayName: 'PreventivoLinea';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    dati: Attribute.Component<'documento.linea'> & Attribute.Required;
    personalizzazione: Attribute.Component<'pers.personalizzazione'>;
    lavorazione: Attribute.Relation<
      'api::preventivo-linea.preventivo-linea',
      'oneToOne',
      'api::lavorazione.lavorazione'
    >;
    preventivo: Attribute.Relation<
      'api::preventivo-linea.preventivo-linea',
      'manyToOne',
      'api::preventivo.preventivo'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::preventivo-linea.preventivo-linea',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::preventivo-linea.preventivo-linea',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProdottoProdotto extends Schema.CollectionType {
  collectionName: 'prodotti';
  info: {
    singularName: 'prodotto';
    pluralName: 'prodotti';
    displayName: 'Prodotto';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required & Attribute.Unique;
    descrizione: Attribute.Text & Attribute.Required;
    personalizzabile: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    media: Attribute.Media;
    tessuti: Attribute.Relation<
      'api::prodotto.prodotto',
      'manyToMany',
      'api::tessuto.tessuto'
    >;
    codice: Attribute.String;
    taglie: Attribute.Relation<
      'api::prodotto.prodotto',
      'manyToMany',
      'api::taglia.taglia'
    >;
    calcoloPrezzo: Attribute.Enumeration<['Calcolatore', 'Listino']> &
      Attribute.Required &
      Attribute.DefaultTo<'Listino'>;
    prodottiDipendenti: Attribute.Relation<
      'api::prodotto.prodotto',
      'manyToMany',
      'api::prodotto.prodotto'
    >;
    prodottiServiti: Attribute.Relation<
      'api::prodotto.prodotto',
      'manyToMany',
      'api::prodotto.prodotto'
    >;
    finiture: Attribute.Relation<
      'api::prodotto.prodotto',
      'manyToMany',
      'api::finitura-default.finitura-default'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::prodotto.prodotto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::prodotto.prodotto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSequenzaNumericaSequenzaNumerica
  extends Schema.CollectionType {
  collectionName: 'sequenza_numericas';
  info: {
    singularName: 'sequenza-numerica';
    pluralName: 'sequenza-numericas';
    displayName: 'sequenzaNumerica';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required;
    sequenza: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<1>;
    riferimento: Attribute.String;
    azienda: Attribute.Relation<
      'api::sequenza-numerica.sequenza-numerica',
      'manyToOne',
      'api::azienda.azienda'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sequenza-numerica.sequenza-numerica',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::sequenza-numerica.sequenza-numerica',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSettoreSettore extends Schema.CollectionType {
  collectionName: 'settori';
  info: {
    singularName: 'settore';
    pluralName: 'settori';
    displayName: 'Settore';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required;
    dipendenti: Attribute.Relation<
      'api::settore.settore',
      'manyToMany',
      'api::dipendente.dipendente'
    >;
    settoreSuccessivo: Attribute.Relation<
      'api::settore.settore',
      'oneToOne',
      'api::settore.settore'
    >;
    settorePrecedente: Attribute.Relation<
      'api::settore.settore',
      'oneToOne',
      'api::settore.settore'
    >;
    lavorazioni: Attribute.Relation<
      'api::settore.settore',
      'oneToMany',
      'api::lavorazione.lavorazione'
    >;
    stati: Attribute.Relation<
      'api::settore.settore',
      'oneToMany',
      'api::stato-settore.stato-settore'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::settore.settore',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::settore.settore',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStatoSettoreStatoSettore extends Schema.CollectionType {
  collectionName: 'stati_settore';
  info: {
    singularName: 'stato-settore';
    pluralName: 'stati-settore';
    displayName: 'StatoSettore';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required;
    descrizione: Attribute.Text;
    settore: Attribute.Relation<
      'api::stato-settore.stato-settore',
      'manyToOne',
      'api::settore.settore'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::stato-settore.stato-settore',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::stato-settore.stato-settore',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTagliaTaglia extends Schema.CollectionType {
  collectionName: 'taglie';
  info: {
    singularName: 'taglia';
    pluralName: 'taglie';
    displayName: 'Taglia';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required & Attribute.Unique;
    descrizione: Attribute.Text;
    prodotti: Attribute.Relation<
      'api::taglia.taglia',
      'manyToMany',
      'api::prodotto.prodotto'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::taglia.taglia',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::taglia.taglia',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTelefonataTelefonata extends Schema.CollectionType {
  collectionName: 'telefonate';
  info: {
    singularName: 'telefonata';
    pluralName: 'telefonate';
    displayName: 'Telefonata';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String;
    data: Attribute.DateTime;
    telefono: Attribute.String;
    estensione: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::telefonata.telefonata',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::telefonata.telefonata',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTessutoTessuto extends Schema.CollectionType {
  collectionName: 'tessuti';
  info: {
    singularName: 'tessuto';
    pluralName: 'tessuti';
    displayName: 'Tessuto';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    nome: Attribute.String & Attribute.Required;
    grammatura: Attribute.Integer;
    altezzaMassima: Attribute.Integer;
    descrizione: Attribute.Text;
    foto: Attribute.Media;
    prodotti: Attribute.Relation<
      'api::tessuto.tessuto',
      'manyToMany',
      'api::prodotto.prodotto'
    >;
    bordature: Attribute.Relation<
      'api::tessuto.tessuto',
      'manyToMany',
      'api::bordatura.bordatura'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::tessuto.tessuto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::tessuto.tessuto',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUtenteUtente extends Schema.CollectionType {
  collectionName: 'utenti';
  info: {
    singularName: 'utente';
    pluralName: 'utenti';
    displayName: 'Utente';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    login: Attribute.Relation<
      'api::utente.utente',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    rappresentante: Attribute.Relation<
      'api::utente.utente',
      'manyToOne',
      'api::dipendente.dipendente'
    >;
    indirizziSpedizione: Attribute.Component<'utente.indirizzo', true>;
    indirizzoFatturazione: Attribute.Component<'utente.indirizzo'>;
    cliente: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<true>;
    fornitore: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    note: Attribute.Text;
    ivaDefault: Attribute.Relation<
      'api::utente.utente',
      'oneToOne',
      'api::iva.iva'
    >;
    listino: Attribute.Relation<
      'api::utente.utente',
      'manyToOne',
      'api::listino.listino'
    >;
    metodoPagamento: Attribute.Relation<
      'api::utente.utente',
      'oneToOne',
      'api::metodo-pagamento.metodo-pagamento'
    >;
    iban: Attribute.String;
    contatti: Attribute.Component<'utente.contatto', true>;
    sconto: Attribute.Integer &
      Attribute.SetMinMax<
        {
          max: 70;
        },
        number
      > &
      Attribute.DefaultTo<0>;
    denominazione: Attribute.String & Attribute.Required;
    preventivi: Attribute.Relation<
      'api::utente.utente',
      'oneToMany',
      'api::preventivo.preventivo'
    >;
    banca: Attribute.Relation<
      'api::utente.utente',
      'oneToOne',
      'api::banca.banca'
    >;
    azienda: Attribute.Relation<
      'api::utente.utente',
      'manyToOne',
      'api::azienda.azienda'
    >;
    ordini_cliente: Attribute.Relation<
      'api::utente.utente',
      'oneToMany',
      'api::ordine-cliente.ordine-cliente'
    >;
    documenti_trasporto: Attribute.Relation<
      'api::utente.utente',
      'oneToMany',
      'api::documento-trasporto.documento-trasporto'
    >;
    partitaIva: Attribute.String & Attribute.Unique;
    codiceFiscale: Attribute.String;
    codiceDestinatario: Attribute.String;
    riferimentoAmministrazione: Attribute.String;
    pec: Attribute.Email;
    idEsterno: Attribute.String;
    ultimoAcquisto: Attribute.Date;
    ultimaRichiesta: Attribute.Date;
    portoDefault: Attribute.Enumeration<
      ['Franco', 'Franco con addebito in fattura', 'Assegnato']
    >;
    vettoreDefault: Attribute.Enumeration<
      [
        'Mittente',
        'Destinatario',
        'Vettore GLS',
        'Vettore BRT',
        'Vettore DHL',
        'Vettore TNT',
        'Vettore SDA',
        'Vettore FedEx',
        'Vettore'
      ]
    >;
    ultimaImportazione: Attribute.DateTime & Attribute.Private;
    idIndirizzoSpedizioneDefault: Attribute.Integer;
    splitPayment: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    tipoUtente: Attribute.Enumeration<
      ['Privato', 'Azienda', 'Agenzia', 'Pubblica Amministrazione']
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::utente.utente',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::utente.utente',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::accessorio.accessorio': ApiAccessorioAccessorio;
      'api::azienda.azienda': ApiAziendaAzienda;
      'api::banca.banca': ApiBancaBanca;
      'api::bordatura.bordatura': ApiBordaturaBordatura;
      'api::dipendente.dipendente': ApiDipendenteDipendente;
      'api::documento-trasporto.documento-trasporto': ApiDocumentoTrasportoDocumentoTrasporto;
      'api::documento-trasporto-linea.documento-trasporto-linea': ApiDocumentoTrasportoLineaDocumentoTrasportoLinea;
      'api::finitura-default.finitura-default': ApiFinituraDefaultFinituraDefault;
      'api::iva.iva': ApiIvaIva;
      'api::lavorazione.lavorazione': ApiLavorazioneLavorazione;
      'api::listino.listino': ApiListinoListino;
      'api::metodo-pagamento.metodo-pagamento': ApiMetodoPagamentoMetodoPagamento;
      'api::ordine-cliente.ordine-cliente': ApiOrdineClienteOrdineCliente;
      'api::ordine-cliente-linea.ordine-cliente-linea': ApiOrdineClienteLineaOrdineClienteLinea;
      'api::preventivo.preventivo': ApiPreventivoPreventivo;
      'api::preventivo-linea.preventivo-linea': ApiPreventivoLineaPreventivoLinea;
      'api::prodotto.prodotto': ApiProdottoProdotto;
      'api::sequenza-numerica.sequenza-numerica': ApiSequenzaNumericaSequenzaNumerica;
      'api::settore.settore': ApiSettoreSettore;
      'api::stato-settore.stato-settore': ApiStatoSettoreStatoSettore;
      'api::taglia.taglia': ApiTagliaTaglia;
      'api::telefonata.telefonata': ApiTelefonataTelefonata;
      'api::tessuto.tessuto': ApiTessutoTessuto;
      'api::utente.utente': ApiUtenteUtente;
    }
  }
}
