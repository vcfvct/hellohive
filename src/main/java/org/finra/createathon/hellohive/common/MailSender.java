package org.finra.createathon.hellohive.common;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 * User: Han Li
 * Date: 8/8/16
 */
public class MailSender
{
    private static MimeMessage getMimeMessage(String to, String from, Session session, String body, String subject)
    {
        MimeMessage message = new MimeMessage(session);
        try
        {
            // Set From: header field of the header.
            message.setFrom(new InternetAddress(from));

            // Set To: header field of the header.
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

            // Set Subject: header field
            message.setSubject(subject);

            // Now set the actual message
            message.setText(body);
        } catch (MessagingException ignored)
        {
        }
        return message;
    }

    private static Session getSession()
    {
        // TODO CHANGE THIS
        String host = "localhost";

        // Get system properties
        Properties properties = System.getProperties();

        // Setup mail server
        properties.setProperty("mail.smtp.host", host);
        properties.setProperty("mail.transport.protocol", "smtp");
        //TODO CHANGE HERE
        properties.setProperty("mail.smtp.port", "2525");

        // Get the default Session object.
        return Session.getDefaultInstance(properties);
    }

    public void sendEmail(String from, String to, String subject, String body) throws MessagingException
    {
        Session session = getSession();
        Transport t = session.getTransport();
        t.connect();
        MimeMessage msg = getMimeMessage(to, from, session, body, subject);
        t.sendMessage(msg, msg.getAllRecipients());
    }
}
