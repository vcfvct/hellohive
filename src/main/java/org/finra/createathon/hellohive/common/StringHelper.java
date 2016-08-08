package org.finra.createathon.hellohive.common;

import java.util.UUID;

/**
 * User: Han Li
 * Date: 8/8/16
 */
public class StringHelper
{
    public static String obtainRandomId()
    {
        return UUID.randomUUID().toString();
    }

}
