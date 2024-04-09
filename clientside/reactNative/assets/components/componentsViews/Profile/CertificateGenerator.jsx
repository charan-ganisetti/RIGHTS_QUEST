import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

const CertificateGenerator = ({ recipientName }) => {
    const generateCertificate = async () => {
        try {
            // Check if the document directory exists
            const documentDirectoryInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory);

            if (!documentDirectoryInfo.exists) {
                // Document directory doesn't exist, create it
                await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory, { intermediates: true });
            }
            // Your certificate content (replace with your design)
            const certificateContent = `
      <html>
      <head>
          <style type='text/css'>
              body, html {
                  margin: 0;
                  padding: 0;
              }
              @page {
                size: 750px 563px; /* Set the PDF page size to match the certificate dimensions */
                margin: 0;
              }
              body {
                  color: black;
                  display: table;
                  font-family: Georgia, serif;
                  font-size: 24px;
                  text-align: center;
              }
              .container {
                border: 20px solid tan;
                width: 750px;
                height: 563px;
                display: table-cell;
                vertical-align: middle;
                margin: 0 auto; /* Center the container horizontally */
                
            }
              .logo {
                  color: tan;
              }
  
              .marquee {
                  color: tan;
                  font-size: 48px;
                  margin: 20px;
              }
              .assignment {
                  margin: 20px;
              }
              .person {
                  border-bottom: 2px solid black;
                  font-size: 32px;
                  font-style: italic;
                  margin: 20px auto;
                  width: 400px;
              }
              .reason {
                  margin: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="logo">
                Rights Quest
              </div>
  
              <div class="marquee">
                  Certificate of Completion
              </div>
  
              <div class="assignment">
                  This certificate is presented to
              </div>
  
              <div class="person">
                  ${recipientName}
              </div>
  
              <div class="reason">
                  For deftly defying the laws of gravity<br/>
                  and flying high
              </div>
          </div>
      </body>
  </html>
      `;

            // Convert HTML to PDF
            const { uri } = await Print.printToFileAsync({ html: certificateContent });

            // Move the PDF to a permanent location
            const permanentUri = `${FileSystem.documentDirectory}Certificate.pdf`;
            await FileSystem.moveAsync({ from: uri, to: permanentUri });

            // Share the PDF to save it to the device's media library
            await Sharing.shareAsync(permanentUri);

            // Handle the generated PDF file (e.g., display, save, share)
            console.log('Generated certificate:', permanentUri);
            Alert.alert('Success', 'Certificate generated successfully!');
        } catch (error) {
            console.error('Error generating or saving certificate:', error);

            // Handle the error (e.g., show an alert)
            Alert.alert('Error', 'Failed to generate or save certificate.');
        }
    };

    return (
        <View>
            <Button title="Share Certificate" onPress={generateCertificate} />
        </View>
    );
};

export default CertificateGenerator;