import {
  CfnOutput,
  RemovalPolicy,
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as targets from "aws-cdk-lib/aws-route53-targets";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as path from "path";

const DOMAIN_NAME = "thangtrandev.net";

/**
 * This stack deploys a statically exported Next.js app to S3 + CloudFront
 * with a custom domain (thangtrandev.net) via Route 53.
 */
export class AppRouterStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Look up the existing Route 53 hosted zone
    const hostedZone = route53.HostedZone.fromLookup(this, "HostedZone", {
      domainName: DOMAIN_NAME,
    });

    // ACM certificate for CloudFront (must be in us-east-1)
    const certificate = new acm.DnsValidatedCertificate(this, "Certificate", {
      domainName: DOMAIN_NAME,
      hostedZone,
      region: "us-east-1", // Required for CloudFront
    });

    // S3 bucket for static site hosting (private — accessed via CloudFront OAI)
    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    // CloudFront Origin Access Identity
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "OAI"
    );
    siteBucket.grantRead(originAccessIdentity);

    // CloudFront distribution with custom domain
    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessIdentity(siteBucket, {
          originAccessIdentity,
        }),
        viewerProtocolPolicy:
          cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: "index.html",
      domainNames: [DOMAIN_NAME],
      certificate,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: "/index.html",
        },
      ],
    });

    // Route 53 A record (IPv4) pointing to CloudFront
    new route53.ARecord(this, "AliasRecord", {
      zone: hostedZone,
      recordName: DOMAIN_NAME,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });

    // Route 53 AAAA record (IPv6) pointing to CloudFront
    new route53.AaaaRecord(this, "AliasRecordIPv6", {
      zone: hostedZone,
      recordName: DOMAIN_NAME,
      target: route53.RecordTarget.fromAlias(
        new targets.CloudFrontTarget(distribution)
      ),
    });

    // Deploy the Next.js static export (`out/` directory) to S3
    new s3deploy.BucketDeployment(this, "DeployStaticSite", {
      sources: [
        s3deploy.Source.asset(path.join(__dirname, "../../nextapp/out")),
      ],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });

    new CfnOutput(this, "CloudFrontDistributionDomain", {
      value: distribution.distributionDomainName,
    });

    new CfnOutput(this, "CustomDomain", {
      value: `https://${DOMAIN_NAME}`,
    });
  }
}
