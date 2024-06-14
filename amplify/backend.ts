import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

const backend = defineBackend({
  auth,
  data,
});


// enable TTL on data table
const dataResources = backend.data.resources;
dataResources.cfnResources.amplifyDynamoDbTables['Message'].timeToLiveAttribute = {
  enabled: true,
  attributeName: 'ttl',
};