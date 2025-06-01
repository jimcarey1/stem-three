import boto3
import os

def lambda_handler(event, context):
    # Initialize MediaPackage VOD client
    try:
        mediapackage_client = boto3.client('mediapackage-vod')

        job_id = event['detail']['jobId']
        playlistFilePath = event['detail']['outputGroupDetails'][0]['playlistFilePaths'][0]

        bucket_name, key_prefix, main_manifest = playlistFilePath.split('/')[2:]


        # Retrieve environment variables
        packaging_group_id = os.environ.get('PACKAGING_GROUP_ID')
        source_role_arn = os.environ.get('SOURCE_ROLE_ARN')

        if not packaging_group_id or not source_role_arn:
            print('Missing PACKAGING_GROUP_ID or SOURCE_ROLE_ARN environment variables.')
            return

        # Generate a unique asset ID
        asset_id = f"asset-{job_id}"

        # Construct the source ARN
        source_arn = f'arn:aws:s3:::{bucket_name}/{key_prefix}/{main_manifest}'

        try:
            # Create the MediaPackage VOD asset
            response = mediapackage_client.create_asset(
                Id=key_prefix,
                PackagingGroupId=packaging_group_id,
                SourceArn=source_arn,
                SourceRoleArn=source_role_arn
            )
            print(f'Successfully created MediaPackage asset: {asset_id}')
        except Exception as e:
            print(f'Error creating MediaPackage asset: {e}')
    except Exception as error:
        print(f'Might be error parsing the event: {error}')
