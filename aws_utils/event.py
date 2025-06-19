event = {'version': '0', 'id': '7dda81d8-e977-cfdf-e799-1adc672fc1a9', 'detail-type': 'MediaConvert Job State Change', 'source': 'aws.mediaconvert', 'account': 'YOUR_ACCOUNT_NO', 'time': '2025-05-28T15:10:09Z', 'region': 'AWS_REGION', 'resources': ['arn:aws:mediaconvert:region:123456789012:jobs/1748444995714-rag6bw'], 'detail': {'timestamp': 1748445009127, 'accountId': '123456789012', 'queue': 'arn:aws:mediaconvert:region:1234567890:queues/Default', 'jobId': '1748444995714-rag6bw', 'status': 'COMPLETE', 'userMetadata': {}, 'outputGroupDetails': [{'outputDetails': [{'outputFilePaths': ['s3://bucket_name/LMS_testing_dup/LMS_testing_dup_360.m3u8'], 'durationInMs': 37766, 'videoDetails': {'widthInPx': 640, 'heightInPx': 360, 'averageBitrate': 550305, 'qvbrAvgQuality': 7.86, 'qvbrMinQuality': 6.33, 'qvbrMaxQuality': 8.0, 'qvbrMinQualityLocation': 35500, 'qvbrMaxQualityLocation': 0}}], 'playlistFilePaths': ['s3://bucket_name/LMS_testing_dup/LMS_testing_dup.m3u8'], 'type': 'HLS_GROUP'}, {'outputDetails': [{'outputFilePaths': ['s3://bucket_name/LMS_testing_dup/LMS_testing_dup_720.m3u8'], 'durationInMs': 37766, 'videoDetails': {'widthInPx': 1280, 'heightInPx': 720, 'averageBitrate': 3127856, 'qvbrAvgQuality': 9.88, 'qvbrMinQuality': 7.67, 'qvbrMaxQuality': 10.0, 'qvbrMinQualityLocation': 35700, 'qvbrMaxQualityLocation': 0}}], 'playlistFilePaths': ['s3://bucket_name/LMS_testing_dup/LMS_testing_dup.m3u8'], 'type': 'HLS_GROUP'}], 'paddingInserted': 0, 'blackVideoDetected': 0, 'warnings': [{'code': 240000, 'count': 1}]}}

job_id = event['detail']['jobId']
playlistFilePath = event['detail']['outputGroupDetails'][0]['playlistFilePaths'][0]

bucket_name, key_prefix, main_manifest = playlistFilePath.split('/')[2:]
print(playlistFilePath.split('/'))
print(bucket_name, key_prefix, main_manifest)

playlistFilePath:str = (event['detail']['outputGroupDetails'][0]['playlistFilePaths'][0]).split('/')
file_name:str = (event['detail']['outputGroupDetails'][0]['playlistFilePaths'][0]).split('/')[-2]
print(file_name)