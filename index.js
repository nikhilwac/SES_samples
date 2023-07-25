const exceptions = require('./exception');
const AWS = require("aws-sdk");
require('dotenv').config();
const ses = new AWS.SESV2({ region: process.env.REGION });
const fromEmail = process.env.EMAIL;

module.exports.sendEmail = async (event) => {
  let email;
  let name;
  let TemplateName;
  let TopicName
  let ContactListName
  let statusCode = 400
  let isSuccess = false
  try {
    const requestBody = JSON.parse(event.body);
    email = requestBody.email;
    name = requestBody.name;
    TemplateName = requestBody.TemplateName;
    ContactListName = requestBody.ContactListName
    TopicName = requestBody.TopicName
  } catch (error) {
    let response = exceptions('Error: Please provide an "email" field in the request body.', {}, error, statusCode, isSuccess)
    return response
  }

  const templateData = {
    name: name,
  };

  var params = {
    Content: {
      Template: {
        TemplateName: TemplateName,
        TemplateData: JSON.stringify(templateData),
      },
    },
    Destination: {
      ToAddresses: email,
    },
    FromEmailAddress: fromEmail,
    ListManagementOptions: {
      ContactListName: ContactListName,
      TopicName: TopicName
    }
  };

  try {
    const sendEmailResult = await ses.sendEmail(params).promise();
    console.log("Email submitted to SES", sendEmailResult);
  } catch (error) {
    console.log("Email not submitted to SES:", error);
    let response = exceptions('Error: There is an error encountered while sending email', {}, error, statusCode, isSuccess)
    return response
  }
  if (sendEmailResult) {
    statusCode = 200
    isSuccess = true
    let response = exceptions.exceptions('Success: Email send successfully', sendEmailResult, {}, statusCode, isSuccess)
    return response
  }
};

module.exports.createTemplate = async (event) => {
  let statusCode = 400
  let isSuccess = false
  try {
    const requestBody = JSON.parse(event.body);
    TemplateName = requestBody.TemplateName;
  } catch (error) {
    let response = exceptions.exceptions('Error: Please provide an "TemplateName" field in the request body.', {}, error, statusCode, isSuccess)
    return response
  }
  // Initialize AWS SES client
  var templateParams = {
    TemplateContent: {
      /* required */
      Html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
            <head>
            <!--[if gte mso 9]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
            <![endif]-->
              <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta name="x-apple-disable-message-reformatting">
              <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
              <title></title>
              
                <style type="text/css">
                  @media only screen and (min-width: 620px) {
              .u-row {
                width: 600px !important;
              }
              .u-row .u-col {
                vertical-align: top;
              }
            
              .u-row .u-col-25 {
                width: 150px !important;
              }
            
              .u-row .u-col-33p33 {
                width: 199.98px !important;
              }
            
              .u-row .u-col-50 {
                width: 300px !important;
              }
            
              .u-row .u-col-66p67 {
                width: 400.02px !important;
              }
            
              .u-row .u-col-100 {
                width: 600px !important;
              }
            
            }
            
            @media (max-width: 620px) {
              .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
              }
              .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
              }
              .u-row {
                width: 100% !important;
              }
              .u-col {
                width: 100% !important;
              }
              .u-col > div {
                margin: 0 auto;
              }
              .no-stack .u-col {
                min-width: 0 !important;
                display: table-cell !important;
              }
            
              .no-stack .u-col-25 {
                width: 25% !important;
              }
            
            }
            body {
              margin: 0;
              padding: 0;
            }
            
            table,
            tr,
            td {
              vertical-align: top;
              border-collapse: collapse;
            }
            
            p {
              margin: 0;
            }
            
            .ie-container table,
            .mso-container table {
              table-layout: fixed;
            }
            
            * {
              line-height: inherit;
            }
            
            a[x-apple-data-detectors='true'] {
              color: inherit !important;
              text-decoration: none !important;
            }
            
            table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; } @media (max-width: 480px) { #u_content_heading_2 .v-font-size { font-size: 21px !important; } #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 100% !important; } #u_content_heading_1 .v-font-size { font-size: 21px !important; } #u_content_button_1 .v-size-width { width: 65% !important; } #u_content_image_2 .v-src-width { width: auto !important; } #u_content_image_2 .v-src-max-width { max-width: 30% !important; } #u_content_heading_3 .v-container-padding-padding { padding: 0px 10px !important; } #u_content_heading_3 .v-text-align { text-align: center !important; } #u_content_text_1 .v-container-padding-padding { padding: 5px 15px 60px !important; } #u_content_text_1 .v-text-align { text-align: center !important; } #u_content_image_3 .v-src-width { width: auto !important; } #u_content_image_3 .v-src-max-width { max-width: 30% !important; } #u_content_heading_4 .v-container-padding-padding { padding: 0px 10px !important; } #u_content_heading_4 .v-text-align { text-align: center !important; } #u_content_text_2 .v-container-padding-padding { padding: 5px 15px 60px !important; } #u_content_text_2 .v-text-align { text-align: center !important; } #u_content_image_4 .v-src-width { width: auto !important; } #u_content_image_4 .v-src-max-width { max-width: 30% !important; } #u_content_heading_5 .v-container-padding-padding { padding: 0px 10px !important; } #u_content_heading_5 .v-text-align { text-align: center !important; } #u_content_text_3 .v-container-padding-padding { padding: 5px 15px 60px !important; } #u_content_text_3 .v-text-align { text-align: center !important; } #u_content_image_9 .v-container-padding-padding { padding: 30px 10px 10px !important; } #u_content_image_9 .v-src-width { width: auto !important; } #u_content_image_9 .v-src-max-width { max-width: 35% !important; } #u_content_image_9 .v-text-align { text-align: center !important; } #u_content_text_10 .v-container-padding-padding { padding: 10px 35px 30px !important; } #u_content_text_10 .v-text-align { text-align: center !important; } #u_column_14 .v-col-background-color { background-color: #1acf7d !important; } #u_content_heading_8 .v-container-padding-padding { padding: 30px 10px 10px !important; } #u_content_heading_8 .v-font-size { font-size: 22px !important; } #u_content_heading_8 .v-text-align { text-align: center !important; } #u_content_text_9 .v-container-padding-padding { padding: 10px 10px 30px !important; } #u_content_text_9 .v-text-align { text-align: center !important; } #u_content_heading_7 .v-container-padding-padding { padding: 30px 10px 10px !important; } #u_content_heading_7 .v-font-size { font-size: 18px !important; } #u_content_heading_7 .v-text-align { text-align: center !important; } #u_content_text_8 .v-container-padding-padding { padding: 10px 35px 30px !important; } #u_content_text_8 .v-text-align { text-align: center !important; } #u_content_social_1 .v-container-padding-padding { padding: 30px 10px 20px 75px !important; } #u_content_heading_9 .v-container-padding-padding { padding: 0px 10px 32px !important; } #u_content_heading_9 .v-text-align { text-align: center !important; } }
                </style>
              
              
            
            <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><link href="https://fonts.googleapis.com/css2?family=Bitter:wght@600&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
            
            </head>
            
            <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
              <!--[if IE]><div class="ie-container"><![endif]-->
              <!--[if mso]><div class="mso-container"><![endif]-->
              <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
              <tbody>
              <tr style="vertical-align: top">
                <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->
                
            
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                  
            <!--[if (mso)|(IE)]><td align="center" width="600" class="v-col-background-color" style="background-color: #f5f5f5;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #f5f5f5;height: 100%;width: 100% !important;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
              
            <table id="u_content_heading_2" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 30px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: center; word-wrap: break-word; font-family: Bitter; font-size: 35px; font-weight: 400;"><div>
            <div>
            <div><strong>Welcome</strong><br /><strong>{{name}}</strong></div>
            </div>
            </div></h1>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table id="u_content_image_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
                    
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                  
                  <img align="center" border="0" src="https://buck-img.s3.ap-south-1.amazonaws.com/image-1.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 80%;max-width: 464px;" width="464" class="v-src-width v-src-max-width"/>
                  
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table id="u_content_heading_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 20px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 120%; text-align: center; word-wrap: break-word; font-family: Bitter; font-size: 31px; font-weight: 400;"><strong>New Features</strong><br /><strong>to Enhance Business</strong></h1>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table id="u_content_button_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 60px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
            <div class="v-text-align" align="center">
              <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.unlayer.com" style="height:37px; v-text-anchor:middle; width:203px;" arcsize="11%"  stroke="f" fillcolor="#2dc26b"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Open Sans',sans-serif;"><![endif]-->  
                <a href="https://webandcrafts.com/" target="_blank" class="v-button v-size-width v-font-size" style="box-sizing: border-box;display: inline-block;font-family:'Open Sans',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #2dc26b; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:35%; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                  <span style="display:block;padding:10px 20px;line-height:120%;"><strong><span style="font-size: 14px; line-height: 16.8px;">Get Now</span></strong></span>
                </a>
              <!--[if mso]></center></v:roundrect><![endif]-->
            </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
            
            
            
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                  
            <!--[if (mso)|(IE)]><td align="center" width="200" class="v-col-background-color" style="background-color: #f5f5f5;width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #f5f5f5;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table id="u_content_image_2" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 30px;font-family:'Open Sans',sans-serif;" align="left">
                    
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                  
                  <img align="center" border="0" src="https://buck-img.s3.ap-south-1.amazonaws.com/image-4.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 42%;max-width: 75.6px;" width="75.6" class="v-src-width v-src-max-width"/>
                  
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="400" class="v-col-background-color" style="background-color: #f5f5f5;width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-66p67" style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #f5f5f5;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table id="u_content_heading_3" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 0px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <h1 class="v-text-align v-font-size" style="margin: 0px; color: #2dc26b; line-height: 140%; text-align: left; word-wrap: break-word; font-family: Bitter; font-size: 22px; font-weight: 400;"><strong>Template Builder</strong></h1>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table id="u_content_text_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 35px 30px 10px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%;">Lorem ipsum dolor sit amet, consectetur adip iscing elit sed do eiusmod tempor incididunt ut labore.</p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 2px solid #2dc26b;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                <tbody>
                  <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                      <span>&#160;</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
            
            
            
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                  
            <!--[if (mso)|(IE)]><td align="center" width="200" class="v-col-background-color" style="background-color: #f5f5f5;width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #f5f5f5;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table id="u_content_image_3" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 30px;font-family:'Open Sans',sans-serif;" align="left">
                    
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                  
                  <img align="center" border="0" src="https://buck-img.s3.ap-south-1.amazonaws.com/image-2.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 42%;max-width: 75.6px;" width="75.6" class="v-src-width v-src-max-width"/>
                  
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="400" class="v-col-background-color" style="background-color: #f5f5f5;width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-66p67" style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #f5f5f5;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table id="u_content_heading_4" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 0px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <h1 class="v-text-align v-font-size" style="margin: 0px; color: #2dc26b; line-height: 140%; text-align: left; word-wrap: break-word; font-family: Bitter; font-size: 22px; font-weight: 400;"><strong>Change Colors</strong></h1>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table id="u_content_text_2" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 35px 30px 10px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%;">Lorem ipsum dolor sit amet, consectetur adip iscing elit sed do eiusmod tempor incididunt ut labore.</p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 2px solid #1bdd85;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                <tbody>
                  <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                      <span>&#160;</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
            
            
            
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                  
            <!--[if (mso)|(IE)]><td align="center" width="200" class="v-col-background-color" style="background-color: #f5f5f5;width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #f5f5f5;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table id="u_content_image_4" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 30px;font-family:'Open Sans',sans-serif;" align="left">
                    
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                  
                  <img align="center" border="0" src="https://buck-img.s3.ap-south-1.amazonaws.com/image-13.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 42%;max-width: 75.6px;" width="75.6" class="v-src-width v-src-max-width"/>
                  
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="400" class="v-col-background-color" style="background-color: #f5f5f5;width: 400px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-66p67" style="max-width: 320px;min-width: 400px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #f5f5f5;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table id="u_content_heading_5" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 0px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <h1 class="v-text-align v-font-size" style="margin: 0px; color: #2dc26b; line-height: 140%; text-align: left; word-wrap: break-word; font-family: Bitter; font-size: 22px; font-weight: 400;"><strong>Expert Layout</strong></h1>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table id="u_content_text_3" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 35px 30px 10px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%;">Lorem ipsum dolor sit amet, consectetur adip iscing elit sed do eiusmod tempor incididunt ut labore.</p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 2px solid #2dc26b;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                <tbody>
                  <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                      <span>&#160;</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
            
            
            
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row no-stack" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                  
            <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-background-color" style="background-color: #f5f5f5;width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-25" style="max-width: 320px;min-width: 150px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #f5f5f5;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:63px 10px 20px;font-family:'Open Sans',sans-serif;" align="left">
                    
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                  
                  <img align="center" border="0" src="https://buck-img.s3.ap-south-1.amazonaws.com/image-3.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 51px;" width="51" class="v-src-width v-src-max-width"/>
                  
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;"><strong>Quality Service</strong></span></p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-background-color" style="background-color: #f5f5f5;width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-25" style="max-width: 320px;min-width: 150px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #f5f5f5;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 13px;font-family:'Open Sans',sans-serif;" align="left">
                    
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                  
                  <img align="center" border="0" src="https://buck-img.s3.ap-south-1.amazonaws.com/image-7.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 47px;" width="47" class="v-src-width v-src-max-width"/>
                  
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;"><strong>Low Prices</strong></span></p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-background-color" style="background-color: #f5f5f5;width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-25" style="max-width: 320px;min-width: 150px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #f5f5f5;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:61px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
                    
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                  
                  <img align="center" border="0" src="https://buck-img.s3.ap-south-1.amazonaws.com/image-12.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 29px;" width="29" class="v-src-width v-src-max-width"/>
                  
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;"><strong>Modern Style</strong></span></p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="150" class="v-col-background-color" style="background-color: #f5f5f5;width: 150px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-25" style="max-width: 320px;min-width: 150px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #f5f5f5;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
                    
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                  
                  <img align="center" border="0" src="https://buck-img.s3.ap-south-1.amazonaws.com/image-5.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 50px;" width="50" class="v-src-width v-src-max-width"/>
                  
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 60px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;"><strong>24/7 Support</strong></span></p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
            
            
            
            <div class="u-row-container" style="padding: 0px;background-color: transparent">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                  
            <!--[if (mso)|(IE)]><td align="center" width="200" class="v-col-background-color" style="background-color: #1bdd85;width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #1bdd85;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table id="u_content_image_9" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:60px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
                    
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="left">
                  
                  <img align="left" border="0" src="https://buck-img.s3.ap-south-1.amazonaws.com/png-transparent-marvel-avengers-logo-ultron-captain-america-baron-zemo-iron-man-marvel-comics-avengers-marvel-avengers-assemble-text-logo.png" alt="image" title="image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 50%;max-width: 90px;" width="90" class="v-src-width v-src-max-width"/>
                  
                </td>
              </tr>
            </table>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table id="u_content_text_10" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%;">Lorem ipsum dolor sit amet, consec tetur adip iscing elit.</p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="200" class="v-col-background-color" style="background-color: #1bdd85;width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div id="u_column_14" class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #1bdd85;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table id="u_content_heading_8" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:62px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: 'Open Sans',sans-serif; font-size: 22px; font-weight: 400;"><div>
            <div><strong>Info</strong></div>
            </div></h1>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table id="u_content_text_9" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%;">Website</p>
            <p style="font-size: 14px; line-height: 140%;">Feature</p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="200" class="v-col-background-color" style="background-color: #1bdd85;width: 200px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-33p33" style="max-width: 320px;min-width: 200px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="background-color: #1bdd85;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table id="u_content_heading_7" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:62px 10px 10px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-family: 'Open Sans',sans-serif; font-size: 22px; font-weight: 400;"><div>
            <div>
            <div><strong>Location</strong></div>
            </div>
            </div></h1>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
            <table id="u_content_text_8" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 60px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                <p style="font-size: 14px; line-height: 140%;">2261 Market Street #4667, San Francisco, CA 94114</p>
              </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
            
            
            
            <div class="u-row-container" style="padding: 0px;background-color: #ffffff">
              <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
                  
            <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-background-color" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table id="u_content_social_1" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px;font-family:'Open Sans',sans-serif;" align="left">
                    
            <div align="left">
              <div style="display: table; max-width:187px;">
              <!--[if (mso)|(IE)]><table width="187" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="left"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:187px;"><tr><![endif]-->
              
                
                <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                  <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <a href="https://facebook.com/" title="Facebook" target="_blank">
                      <img src="https://buck-img.s3.ap-south-1.amazonaws.com/image-6.png" alt="Facebook" title="Facebook" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                    </a>
                  </td></tr>
                </tbody></table>
                <!--[if (mso)|(IE)]></td><![endif]-->
                
                <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                  <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <a href="https://twitter.com/" title="Twitter" target="_blank">
                      <img src="https://buck-img.s3.ap-south-1.amazonaws.com/image-9.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                    </a>
                  </td></tr>
                </tbody></table>
                <!--[if (mso)|(IE)]></td><![endif]-->
                
                <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 15px;" valign="top"><![endif]-->
                <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 15px">
                  <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <a href="https://linkedin.com/" title="LinkedIn" target="_blank">
                      <img src="https://buck-img.s3.ap-south-1.amazonaws.com/image-10.png" alt="LinkedIn" title="LinkedIn" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                    </a>
                  </td></tr>
                </tbody></table>
                <!--[if (mso)|(IE)]></td><![endif]-->
                
                <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                  <tbody><tr style="vertical-align: top"><td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <a href="https://instagram.com/" title="Instagram" target="_blank">
                      <img src="https://buck-img.s3.ap-south-1.amazonaws.com/image-11.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                    </a>
                  </td></tr>
                </tbody></table>
                <!--[if (mso)|(IE)]></td><![endif]-->
                
                
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]><td align="center" width="300" class="v-col-background-color" style="width: 300px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
            <div class="u-col u-col-50" style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
              <div class="v-col-background-color" style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
              <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
              
            <table id="u_content_heading_9" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
              <tbody>
                <tr>
                  <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:33px 10px 32px;font-family:'Open Sans',sans-serif;" align="left">
                    
              <h1 class="v-text-align v-font-size" style="margin: 0px; line-height: 140%; text-align: right; word-wrap: break-word; font-family: 'Open Sans',sans-serif; font-size: 18px; font-weight: 400;"><div>
            <div>Unsubscribe</div>
            </div></h1>
            
                  </td>
                </tr>
              </tbody>
            </table>
            
              <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
                  <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                </div>
              </div>
            </div>
            
            
                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
              </tbody>
              </table>
              <!--[if mso]></div><![endif]-->
              <!--[if IE]></div><![endif]-->
            </body>
            
            </html>
            >
            </body></html>`,
      Subject: "Subject for your email",
      Text: "Hello, {{name}}!",

    },
    TemplateName: TemplateName
  };

  try {
    console.log("Email template creating.....");
    const result = await ses.createEmailTemplate(templateParams).promise();
    console.log("Email template created successfully:", result);
    statusCode = 200
    isSuccess = true
    let response = exceptions.exceptions('Success: Email template created successfully', result, {}, statusCode, isSuccess)
    return response


  } catch (error) {
    console.error("Error creating email template:", error);
    let response = exceptions.exceptions('Error: Error creating email template', {}, error, statusCode, isSuccess)
    return response
  }
};

module.exports.removeTemplate = async (event) => {
  let templateName;
  let statusCode = 400
  let isSuccess = false
  try {
    const requestBody = JSON.parse(event.body);
    templateName = requestBody.templateName;
  } catch (error) {
    let response = exceptions.exceptions('Error: Please provide an "TemplateName" field in the request body.', {}, error, statusCode, isSuccess)
    return response

  }

  const params = {
    TemplateName: templateName,
  };

  try {
    const deleteTemplateResult = await ses.deleteEmailTemplate(params).promise();
    console.log("Template deleted:", deleteTemplateResult);
    // return {
    //     statusCode: 200,
    //     body: JSON.stringify("Template deleted successfully."),
    // };
    statusCode = 200
    isSuccess = true
    let response = exceptions.exceptions('Success: Template deleted successfully.', deleteTemplateResult, {}, statusCode, isSuccess)
    return response
  } catch (error) {
    console.log("Error deleting template:", error);
    let response = exceptions.exceptions('Error: Error deleting template..', {}, error, statusCode, isSuccess)
    return response
  }
};

module.exports.addContactList = async (event) => {
  let statusCode = 400
  let isSuccess = false
  try {
    const requestBody = JSON.parse(event.body);
    ContactListName = requestBody.ContactListName;
  } catch (error) {
    let response = exceptions.exceptions('Error: Please provide an "email" field in the request body..', {}, error, statusCode, isSuccess)
    return response
  }

  var params = {
    ContactListName: ContactListName, /* required */
    Topics: [
      {
        DefaultSubscriptionStatus: "OPT_IN", /* required */
        DisplayName: 'something', /* required */
        TopicName: 'something', /* required */
        Description: 'something'
      },
      /* more items */
    ]
  };

  try {
    console.log("Creating contact list...");
    const contactListData = await ses.createContactList(params).promise();
    console.log("Contact list created:", contactListData);
    statusCode = 200
    isSuccess = true
    let response = exceptions.exceptions('Success: Contact list created..', contactListData, {}, statusCode, isSuccess)
    return response

  } catch (error) {
    console.log("Error creating contact list:", error.message);
    let response = exceptions.exceptions('Error: Error creating contact list..', {}, error , statusCode, isSuccess)
    return response
  }
};

module.exports.listContactLists = async (event) => {
  let statusCode = 400
  let isSuccess = false
  console.log(event);
  const params = event.queryStringParameters
  console.log('starting....');
  const contactListData = await ses.listContactLists(params).promise()
  console.log('contact list:', contactListData);
  statusCode = 200
  isSuccess = true
  let response = exceptions.exceptions('Success: Contact lists..', contactListData, {}, statusCode, isSuccess)
  return response

}

module.exports.deleteContactList = async (event) => {
  let statusCode = 400
  let isSuccess = false
  console.log(event);
  const data = event.queryStringParameters
  let ContactListName
  try {
    ContactListName = data.ContactListName;
  } catch (error) {
    let response = exceptions.exceptions('Error: Please provide an "ContactListName..', {}, error, statusCode, isSuccess)
    return response
  }
  var params = {
    ContactListName: ContactListName /* required */
  };
  try {
    const contactListData = await ses.deleteContactList(params).promise()
    console.log('contact list:', contactListData);
    statusCode = 200
    isSuccess = true
    let response = exceptions.exceptions('Success: Contact list deleted..', contactListData, {}, statusCode, isSuccess)
    return response
  }
  catch (error) {
    let response = exceptions.exceptions('Error: There is an error deleting the contact list..', {}, error, statusCode, isSuccess)
    return response
  }

}

module.exports.createContact = async (event) => {
  let statusCode = 400
  let isSuccess = false
  let email
  let SubscriptionStatus
  try {
    const requestBody = JSON.parse(event.body);
    email = requestBody.email;
    SubscriptionStatus = requestBody.SubscriptionStatus
  } catch (error) {
    let response = exceptions.exceptions('Error: Please provide an "ContactListName" field in the request body..', {}, error, statusCode, isSuccess)
    return response
  }
  var params = {
    ContactListName: 'Contact-list', /* required */
    EmailAddress: email, /* required */
    // AttributesData: 'STRING_VALUE',
    TopicPreferences: [
      {
        SubscriptionStatus: SubscriptionStatus, /* required */
        TopicName: 'something' /* required */
      },
      /* more items */
    ],
    // UnsubscribeAll: true || false
  };

  try {
    const contactListData = await ses.createContact(params).promise()
    console.log('contact list:', contactListData);
    statusCode = 200
    isSuccess = true
    let response = exceptions.exceptions('Success: Contact list created..', contactListData, {}, statusCode, isSuccess)
    return response
  }
  catch (error) {
    let response = exceptions.exceptions('Error: There is an error creating the contact list..', {}, error, statusCode, isSuccess)
    return response
  }
}

module.exports.listContacts = async (event) => {
  let statusCode = 400
  let isSuccess = false
  console.log(event);
  const data = event.queryStringParameters
  let PageSize = data.PageSize
  let Contactlist = data.Contactlist
  var params = {
    ContactListName: Contactlist, /* required */
    Filter: {
      FilteredStatus: "OPT_IN",
      TopicFilter: {
        TopicName: 'something',
        // UseDefaultIfPreferenceUnavailable: true || false
      }
    },
    PageSize: PageSize
  };

  try {
    const contacData = await ses.listContacts(params).promise()
    console.log('contacts:', contacData);
    statusCode = 200
    isSuccess = true
    let response = exceptions.exceptions('Success: Contactlist listed successfully..', contacData, {}, statusCode, isSuccess)
    return response
  }
  catch (error) {
    let response = exceptions.exceptions('Error: There is an error listing the contacts..', {}, error, statusCode, isSuccess)
    return response
  }

}

module.exports.deleteContact = async (event) => {
  let statusCode = 400
  let isSuccess = false
  console.log(event);
  const data = event.queryStringParameters
  let email
  try {
    email = data.email;
  } catch (error) {
    let response = exceptions.exceptions('Error: Please provide an "ContactListName" field in the request body..', {}, error, statusCode, isSuccess)
    return response
  }
  var params = {
    ContactListName: 'Contact-list', /* required */
    EmailAddress: email /* required */
  };

  try {
    const contacData = await ses.deleteContact(params).promise()
    console.log('contact deleted', contacData);
    statusCode = 200
    isSuccess = true
    let response = exceptions.exceptions('Success: Contact data deleted..', contacData, {}, statusCode, isSuccess)
    return response
  }
  catch (error) {
    let response = exceptions.exceptions('Error: There is an error deleting the contact..', {}, error, statusCode, isSuccess)
    return response
  }
}

module.exports.getContact = async (event) => {
  let statusCode = 400
  let isSuccess = false
  let email;
  let ContactListName
  try {
    const requestBody = event.queryStringParameters
    email = requestBody.email;
    ContactListName = requestBody.ContactListName
  } catch (error) {
    let response = exceptions.exceptions('Error: Please provide an "email" field in the request body..', {}, error, statusCode, isSuccess)
    return response
  }
  var params = {
    ContactListName: ContactListName, /* required */
    EmailAddress: email /* required */
  };
  try {
    const emailDetail = await ses.getContact(params).promise()
    console.log("Email : ", emailDetail);
    statusCode = 200
    isSuccess = true

    let response = await exceptions.exceptions('Success: Contact listing success..', emailDetail, {}, statusCode, isSuccess)
    console.log(response);
    return response
  }
  catch (error) {
    let response = exceptions.exceptions('Error: There is an error getting the contact..', {}, error, statusCode, isSuccess)
    console.log(response);
    return response
  }
}